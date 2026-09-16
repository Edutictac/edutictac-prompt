import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate', includeAssets: ['favicon.svg'], manifest: {
    name: 'EduTicTac Prompt', short_name: 'EduTicTac Prompt', description: 'Crea y organiza prompts educativos', theme_color: '#123c69', background_color: '#f6f8fb', display: 'standalone', start_url: '/', icons: [{ src: '/pwa-192.svg', sizes: '192x192', type: 'image/svg+xml' }, { src: '/pwa-512.svg', sizes: '512x512', type: 'image/svg+xml' }]
  } })]
})
