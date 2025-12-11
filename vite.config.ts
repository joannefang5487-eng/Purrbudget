import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'PurrBudget',
        short_name: 'PurrBudget',
        description: 'A delightful budget tracker featuring a reactive 3D-styled cat companion.',
        theme_color: '#FDFCF8',
        background_color: '#FDFCF8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: "/",
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});