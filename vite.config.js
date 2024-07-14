import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // This creates build in "build" directory instead of default "dist"
    emptyOutDir: true // This ensures the output directory is emptied before building
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4500', // Your backend server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix when forwarding
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Alias for the src directory
    },
  },
});
