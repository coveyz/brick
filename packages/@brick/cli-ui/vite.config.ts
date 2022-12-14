import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolve = (dir: string): string => {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve('src')
    }
  }
})
