import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  // Site de projeto no GitHub Pages: https://<usuario>.github.io/JERFFESON-FLORENCIO/
  base: '/JERFFESON-FLORENCIO/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          charts: ['recharts'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
