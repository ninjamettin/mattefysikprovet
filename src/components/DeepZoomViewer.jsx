import React, { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';

const DeepZoomViewer = ({ manifestUrl, width }) => {
  const viewerRef = useRef(null);
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    if (!manifestUrl || !viewerRef.current) return;

    // Destroy previous viewer if exists
    if (viewer) {
      viewer.destroy();
    }

    const initViewer = async () => {
      try {
        console.log('[DeepZoomViewer] Loading manifest:', manifestUrl);
        const response = await fetch(manifestUrl);
        if (!response.ok) throw new Error(`Failed to load manifest (${response.status})`);
        const manifest = await response.json();

        console.log('[DeepZoomViewer] manifest:', manifest);

        const pages = Array.isArray(manifest.pages) ? manifest.pages : [];
        const manifestDir = manifestUrl.substring(0, manifestUrl.lastIndexOf('/'));

        // Build page image(s) by fetching parts and stitching them in browser
        // We'll create a single master image that stacks all pages vertically
        const pageImageUrls = [];
        const blobUrlsToRevoke = [];
        for (const page of pages) {
          if (!Array.isArray(page.parts) || page.parts.length === 0) {
            console.warn('[DeepZoomViewer] page has no parts, skipping:', page);
            continue;
          }
          // Create absolute URLs for parts
          const partUrls = page.parts.map((p) => `${manifestDir}/${p}`);
          // Fetch parts as blobs and create Image objects
          const imgs = await Promise.all(partUrls.map(async (url) => {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`Failed to fetch part ${url} (${resp.status})`);
            const blob = await resp.blob();
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = () => reject(new Error('Image load error: ' + url));
              img.src = URL.createObjectURL(blob);
            });
          }));

          // Determine full page dimensions
          const fullWidth = imgs.reduce((sum, im) => sum + im.naturalWidth, 0);
          const fullHeight = imgs[0].naturalHeight;

          // Stitch onto canvas
          const canvas = document.createElement('canvas');
          canvas.width = fullWidth;
          canvas.height = fullHeight;
          const ctx = canvas.getContext('2d');
          let x = 0;
          for (const im of imgs) {
            ctx.drawImage(im, x, 0);
            x += im.naturalWidth;
            URL.revokeObjectURL(im.src);
          }

          // Convert canvas to blob URL and store
          const blobUrl = await new Promise((resolve) => canvas.toBlob((b) => resolve(URL.createObjectURL(b)), 'image/jpeg', 0.9));
          pageImageUrls.push({ url: blobUrl, width: fullWidth, height: fullHeight });
          blobUrlsToRevoke.push(blobUrl);
        }

        console.log('[DeepZoomViewer] assembled page images:', pageImageUrls);

        if (pageImageUrls.length === 0) {
          console.warn('[DeepZoomViewer] No page images available to display');
        }

        // Stitch all page images vertically into one master canvas to allow vertical scrolling
        const masterWidth = pageImageUrls.reduce((max, p) => Math.max(max, p.width), 0);
        const masterHeight = pageImageUrls.reduce((sum, p) => sum + p.height, 0);
        const masterCanvas = document.createElement('canvas');
        masterCanvas.width = masterWidth || 1;
        masterCanvas.height = masterHeight || 1;
        const masterCtx = masterCanvas.getContext('2d');
        let y = 0;
        for (const p of pageImageUrls) {
          const img = await new Promise((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = (e) => reject(e);
            i.src = p.url;
          });
          masterCtx.drawImage(img, 0, y, p.width, p.height);
          y += p.height;
          // revoke individual page blob (we keep master blob)
          URL.revokeObjectURL(p.url);
        }

        const masterBlobUrl = await new Promise((resolve) => masterCanvas.toBlob((b) => resolve(URL.createObjectURL(b)), 'image/jpeg', 0.9));
        blobUrlsToRevoke.push(masterBlobUrl);

        // Single tileSource for the stitched document
        const tileSources = [{
          type: 'image',
          url: masterBlobUrl,
          buildPyramid: false,
          width: masterWidth,
          height: masterHeight,
        }];

        console.log('[DeepZoomViewer] master tileSource:', tileSources[0]);

        const osdViewer = OpenSeadragon({
          element: viewerRef.current,
          prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
          sequenceMode: false,
          showNavigationControl: false,
          showNavigator: false,
          defaultZoomLevel: 0,
          minZoomLevel: 0.1,
          maxZoomLevel: 5,
          zoomPerScroll: 1.2,
          immediateRender: true,
          visibilityRatio: 1,
          constrainDuringPan: false,
          collectionMode: false,
          animationTime: 0.12,
          gestureSettingsMouse: { clickToZoom: false, dblClickToZoom: false, dragToPan: true, scrollToZoom: true },
          gestureSettingsTouch: { dragToPan: true, pinchToZoom: true },
          tileSources: tileSources,
        });

        // Attach handlers for diagnostics
        // On open: zoom in by default for better readability and position at top
        const initialZoomFactor = 6; // increase to zoom in on load
        osdViewer.addHandler('open', () => {
          console.log('[DeepZoomViewer] OpenSeadragon opened. items:', osdViewer.world.getItemCount());
          try {
            osdViewer.viewport.goHome(true);
            // Use zoomBy so both viewers get same relative zoom behavior
            osdViewer.viewport.zoomBy(initialZoomFactor, null, true);

            // After zoom, pan to top of the stitched image
            try {
              const bounds = osdViewer.viewport.getBounds(true);
              const imgRect = osdViewer.viewport.viewportToImageRectangle(bounds);
              const centerX = (masterWidth || 0) / 2;
              const centerY = imgRect.height / 2;
              const viewportPoint = osdViewer.viewport.imageToViewportCoordinates(new OpenSeadragon.Point(centerX, centerY));
              osdViewer.viewport.panTo(viewportPoint, true);
            } catch (e) {
              // fallback: just go home
              try { osdViewer.viewport.goHome(true); } catch (e) {}
            }
          } catch (e) {}
        });

        // Amplify pan movement: when the user drags, apply an extra pan delta (sign inverted)
        const panAmplify = 1; // multiplier for pan distance
        try {
          osdViewer.addHandler('canvas-drag', (evt) => {
            if (!evt || !evt.delta) return;
            try {
              // invert sign so drag direction matches expectations, then amplify
              const extraDx = -evt.delta.x * (panAmplify - 1);
              const extraDy = -evt.delta.y * (panAmplify - 1);
              const extraPoints = osdViewer.viewport.deltaPointsFromPixels(new OpenSeadragon.Point(extraDx, extraDy));
              osdViewer.viewport.panBy(extraPoints, true);
            } catch (err) {
              // ignore if methods unavailable
            }
          });
        } catch (e) {
          // older OSD versions may not support canvas-drag; ignore
        }

        osdViewer.addHandler('open-failed', (evt) => {
          console.error('[DeepZoomViewer] Open failed:', evt);
        });

        osdViewer.addHandler('tile-load-failed', (evt) => {
          console.error('[DeepZoomViewer] Tile load failed:', evt);
        });

        osdViewer.addHandler('add-item', () => {
          console.log('[DeepZoomViewer] item added, count:', osdViewer.world.getItemCount());
        });

        setViewer(osdViewer);

        // Cleanup blob URLs when viewer is destroyed
        osdViewer.addHandler('close', () => {
          for (const b of blobUrlsToRevoke) URL.revokeObjectURL(b);
        });
      } catch (error) {
        console.error('Error initializing OpenSeadragon:', error);
      }
    };

    initViewer();

    return () => {
      if (viewer) viewer.destroy();
    };
  }, [manifestUrl]);

  return (
    <div
      ref={viewerRef}
      style={{ width: '100%', height: '100%', minHeight: 360, background: '#f8fafc' }}
    />
  );
};

export default DeepZoomViewer;