import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

type path = string;

const resolve = (dir: string) => {
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
