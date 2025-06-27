import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  // server: {
  //   proxy: {
  //     // Proxy /api requests to backend server
  //     '/api': {
  //       target: 'http://localhost:3000/api', // Your backend server
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   }
  // }
})
