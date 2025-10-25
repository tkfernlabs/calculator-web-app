import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'frontend-morphvm-upq2ibiu.http.cloud.morph.so',
      'localhost',
      '172.16.0.2'
    ],
  },
})
