import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../src/assets/secure_pdfs');
const OUTPUT_DIR = path.join(__dirname, '../public/tiles');

async function processPdf(browser, filePath, relativePath) {
  console.log(`Processing ${relativePath}...`);
  
  // Create output directory
  const pdfDirName = path.basename(relativePath, '.pdf');
  const pdfParentDir = path.dirname(relativePath);
  const outputBaseDir = path.join(OUTPUT_DIR, pdfParentDir, pdfDirName);
  
  await fs.ensureDir(outputBaseDir);

  const page = await browser.newPage();
  
  // Load PDF file using file:// protocol
  // Note: Puppeteer might not render PDF in headless mode directly to screenshot?
  // Actually, Chrome's PDF viewer is tricky in headless.
  // Better approach: Use PDF.js *inside* the browser context to render to canvas, then screenshot the canvas.
  
  // We'll inject a simple HTML that loads PDF.js and renders the PDF.
  // Or we can just use pdfjs-dist in the browser context.
  
  // Let's try a simpler approach:
  // We can use a library like 'pdf-to-img' which uses puppeteer under the hood?
  // No, let's write our own harness.
  
  const pdfData = await fs.readFile(filePath, 'base64');
  
  await page.setContent(`
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <script>
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        </script>
        <style>body { margin: 0; overflow: hidden; }</style>
      </head>
      <body>
        <div id="container"></div>
      </body>
    </html>
  `);

  const numPages = await page.evaluate(async (pdfBase64) => {
    const pdfData = atob(pdfBase64);
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    window.pdfDoc = await loadingTask.promise;
    return window.pdfDoc.numPages;
  }, pdfData);

  console.log(`  Found ${numPages} pages.`);
  const pagesManifest = [];

  for (let i = 1; i <= numPages; i++) {
    console.log(`  Rendering page ${i}/${numPages}...`);
    
    // Render page in browser
    const dimensions = await page.evaluate(async (pageNum) => {
      const page = await window.pdfDoc.getPage(pageNum);
      const scale = 2.0; // High quality
      const viewport = page.getViewport({ scale });
      
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
      
      document.body.innerHTML = '';
      document.body.appendChild(canvas);
      
      return { width: viewport.width, height: viewport.height };
    }, i);

    // Take screenshot of the canvas
    const buffer = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: dimensions.width, height: dimensions.height }
    });

    // Use sharp to generate DZI
    const dziName = `page_${i}`;
    await sharp(buffer)
      .tile({
        layout: 'dz',
        size: 256,
        overlap: 0
      })
      .toFile(path.join(outputBaseDir, `${dziName}.dzi`));

    pagesManifest.push({
      page: i,
      width: dimensions.width / 2.0, // Original size
      height: dimensions.height / 2.0,
      dzi: `${dziName}.dzi`
    });
  }
  
  await page.close();
  
  // Save manifest
  await fs.writeJson(path.join(outputBaseDir, 'manifest.json'), { pages: pagesManifest }, { spaces: 2 });
  console.log(`Done with ${relativePath}`);
}

async function main() {
  try {
    const browser = await puppeteer.launch();
    
    // Find all PDFs
    const files = [];
    async function scanDir(dir, base = '') {
      if (!fs.existsSync(dir)) return;
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(base, entry.name);
        if (entry.isDirectory()) {
          await scanDir(fullPath, relPath);
        } else if (entry.name.endsWith('.pdf')) {
          files.push({ fullPath, relPath });
        }
      }
    }
    
    await scanDir(SOURCE_DIR);
    console.log(`Found ${files.length} PDFs to process.`);
    
    for (const file of files) {
      await processPdf(browser, file.fullPath, file.relPath);
    }
    
    await browser.close();
    console.log('All PDFs processed successfully!');
    
  } catch (error) {
    console.error('Error processing PDFs:', error);
    process.exit(1);
  }
}

main();


