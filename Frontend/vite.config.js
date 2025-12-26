import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Allow external connections
    allowedHosts: [
      'casebound-burghal-louanne.ngrok-free.dev',
      '.ngrok-free.dev', // Allow all ngrok subdomains
      '.ngrok.io', // Allow legacy ngrok domains too
      'localhost'
    ],
  },
})
