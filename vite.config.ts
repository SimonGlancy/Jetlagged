import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/email-api': {
        target: 'https://api.emailoctopus.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/email-api/, ''),
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  base: "/Jetlagged/"
})
