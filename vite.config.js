import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://cash-ex-api.vercel.app',  // Your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''), // Remove '/api/v1' from the proxied request
      },
    },
  },
});
