// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Todo lo que vaya a "/api" se redirige a tu backend en 3001
      '/api': 'http://localhost:3001'
    }
  }
})
