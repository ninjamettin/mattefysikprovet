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
        const response = await fetch(manifestUrl);
        if (!response.ok) throw new Error('Failed to load manifest');
        const manifest = await response.json();
        
        // Calculate total height and positions
        const pages = manifest.pages;
        const tileSources = pages.map(page => {
          // Construct the path to the DZI file relative to the manifest
          const manifestDir = manifestUrl.substring(0, manifestUrl.lastIndexOf('/'));
          return `${manifestDir}/${page.dzi}`;
        });

        const osdViewer = OpenSeadragon({
          element: viewerRef.current,
          prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
          sequenceMode: false,
          showNavigationControl: false,
          showNavigator: false,
          defaultZoomLevel: 0,
          minZoomLevel: 0.5,
          maxZoomLevel: 5,
          visibilityRatio: 1,
          constrainDuringPan: true,
          collectionMode: true,
          collectionRows: pages.length, // Vertical layout
          collectionTileSize: 1024, // Arbitrary, will be adjusted by OSD
          tileSources: tileSources,
          gestureSettingsMouse: {
            clickToZoom: false
          }
        });

        setViewer(osdViewer);

      } catch (error) {
        console.error("Error initializing OpenSeadragon:", error);
      }
    };

    initViewer();

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [manifestUrl]);

  return (
    <div 
      ref={viewerRef} 
      style={{ width: '100%', height: '100%', background: '#f8fafc' }} 
    />
  );
};

export default DeepZoomViewer;