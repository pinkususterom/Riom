import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatically locate and copy any uploaded image files (like *.jpg / *.jpeg / *.png) from root to /public
// so Vite serves them properly as static assets.
const rootDir = process.cwd();
const publicDir = path.resolve(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

try {
  const dirContents = fs.readdirSync(rootDir);
  dirContents.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const srcPath = path.resolve(rootDir, file);
      const destPath = path.resolve(publicDir, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`[Asset Copier] Copied ${file} to public/`);
    }
  });
} catch (err) {
  console.error('[Asset Copier] Error scanning and copying assets:', err);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
