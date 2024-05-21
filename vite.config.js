import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/maps': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
      }
    }
  }
})

// https://vitejs.dev/config/