import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'copy-gallery-list',
      apply: 'build',
      writeBundle() {
        // Copia gallery-list.json para dist/ após o build
        const src = path.join(__dirname, 'public', 'gallery-list.json')
        const dest = path.join(__dirname, 'dist', 'gallery-list.json')
        
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
          console.log('✓ gallery-list.json copiado para dist/')
        }
      }
    }
  ],
  server: {
    open: true,
    port: 3000
  }
})