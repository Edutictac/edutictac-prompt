import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import packageJson from './package.json' with { type: 'json' }

export default defineConfig({
  // EduTicTac Pages sirve el repositorio bajo /<owner>/<repo>/.
  // Las rutas relativas también funcionan en el despliegue Docker de /.
  base: './',
  plugins: [react(), VitePWA({ registerType: 'prompt', includeAssets: ['favicon.svg'], workbox: {
    cacheId: `edutictac-prompt-v${packageJson.version}`,
      cleanupOutdatedCaches: true,
    clientsClaim: true
  }, manifest: {
    name: 'EduTicTac Prompt', short_name: 'EduTicTac Prompt', description: 'Crea y organiza prompts educativos', theme_color: '#123c69', background_color: '#f6f8fb', display: 'standalone', start_url: './', scope: './', icons: [{ src: './pwa-192.svg', sizes: '192x192', type: 'image/svg+xml' }, { src: './pwa-512.svg', sizes: '512x512', type: 'image/svg+xml' }]
  } })]
})
