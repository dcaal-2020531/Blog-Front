import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // <-- aquí se cambia el puerto principal del frontend
   historyApiFallback: true, // <- Esto permite acceder directamente a rutas como /feed
    proxy: {
      '/api': {
        target: 'http://localhost:1998',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
