import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { lookup as lookupMime } from 'mime-types';

const BUILD_DIR = 'target/roq';
const OUT_PATH = path.join(BUILD_DIR, 'pdf', 'documentation.pdf');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

function safeJoin(rootDir, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const cleaned = decoded.replaceAll('\\', '/');
  const resolved = path.resolve(rootDir, `.${cleaned}`);
  const rootResolved = path.resolve(rootDir);
  if (!resolved.startsWith(rootResolved)) {
    throw new Error('Path traversal blocked');
  }
  return resolved;
}

async function readFileIfExists(filePath) {
  try {
    return await fs.readFile(filePath);
  } catch (e) {
    return null;
  }
}

function createStaticServer(rootDir) {
  const server = http.createServer(async (req, res) => {
    try {
      const reqPath = req.url || '/';
      let fsPath = safeJoin(rootDir, reqPath);

      // Directory -> index.html
      try {
        const stat = await fs.stat(fsPath);
        if (stat.isDirectory()) {
          fsPath = path.join(fsPath, 'index.html');
        }
      } catch {
        // If missing, try adding .html for clean URLs (e.g. /docs -> /docs/index.html handled above)
        if (!fsPath.endsWith('.html') && !path.extname(fsPath)) {
          const htmlPath = `${fsPath}.html`;
          const html = await readFileIfExists(htmlPath);
          if (html) {
            res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
            res.end(html);
            return;
          }
        }
      }

      const data = await readFileIfExists(fsPath);
      if (!data) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      const mime = lookupMime(fsPath) || 'application/octet-stream';
      res.writeHead(200, { 'content-type': `${mime}${mime.startsWith('text/') ? '; charset=utf-8' : ''}` });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(String(err?.message || err));
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  // Ensure output directory exists
  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });

  const server = await createStaticServer(BUILD_DIR);

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Render the docs index (has links to all pages)
    await page.goto(`${BASE_URL}/docs/`, { waitUntil: 'networkidle' });

    await page.pdf({
      path: OUT_PATH,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
    });

    await browser.close();
    // eslint-disable-next-line no-console
    console.log(`PDF exported to ${OUT_PATH}`);
  } finally {
    server.close();
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});

