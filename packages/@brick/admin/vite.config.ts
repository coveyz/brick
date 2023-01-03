import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';

type path = string;

const resolve = (dir: string): string => {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": resolve('src')
    }
  },
})
