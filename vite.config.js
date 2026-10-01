import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // En desarrollo, Vite corre en el puerto 5173 y el backend
      // Express en el 4000 (ver server:dev en package.json). Sin este
      // proxy, las llamadas del frontend a "/api/..." no encontrarian
      // el backend durante "npm run dev".
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
