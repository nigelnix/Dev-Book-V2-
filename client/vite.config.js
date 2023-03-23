import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __URL_BASE__: JSON.stringify('http://localhost:5555/'),
  },
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:5555',
        changeOrigin: true,
      },
      '/uploads': 'http://localhost:5555',
    },
  },
})
