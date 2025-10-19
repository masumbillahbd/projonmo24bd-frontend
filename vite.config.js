import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',  // relative paths for all assets
  build: {
    chunkSizeWarningLimit: 1000, // in kB, default is 500
  },
  plugins: [react()]
})
