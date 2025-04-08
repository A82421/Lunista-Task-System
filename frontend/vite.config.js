import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // Acepta conexiones externas
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://backend:3000', // Nombre del servicio en Docker
        changeOrigin: true,
        secure: false,
      
      }
    }
  }
})