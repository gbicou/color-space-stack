import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/color-space-stack/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': join(import.meta.dirname, 'src'),
    },
  },
})
