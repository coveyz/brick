import path from 'path';
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolve = (dir: string) => {
  return path.resolve(__dirname, dir)
}

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

export const config: UserConfig = {
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve('src')
    }
  },
  build: {
    rollupOptions,
    minify: 'terser', // / boolean | terser | esbuild
    sourcemap: false,
    // outDir: './dist', 
    lib: {
      entry: resolve('packages/index.ts'),
      name: 'Brick',
      fileName: format => `index.${format}.js`
    }
  }
}

export default defineConfig(config)