import path from 'path';
import { defineConfig, ConfigEnv, BuildOptions } from 'vite'
import { pluginList } from './plugins';

const resolve = (dir: string) => {
  return path.resolve(__dirname, dir)
}

const rollupOptions = {
  external: ["vue"],
  input: [resolve('packages/index.ts')],
  output: [
    {
      dir: 'dist/es',
      format: 'es',
      entryFileNames: `[name].es.js`,
      chunkFileNames: `chunk-[hash].js`,
      assetFileNames: 'assets/[name]-[hash][extname]',
      globals: {
        vue: 'Vue'
      }
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: `[name].umd.js`,
      chunkFileNames: `chunk-[hash].js`,
      assetFileNames: 'assets/[name]-[hash][extname]',
      globals: {
        vue: 'Vue'
      }
    },
  ]
}

export default ({ command, mode }: ConfigEnv) => {
  return defineConfig({
    plugins: pluginList(command),
    resolve: {
      alias: {
        "@": resolve('src'),
        '~': resolve('packages')
      }
    },
    optimizeDeps: {
      include: ['vue', '@vue/shared']
    },
    build: {
      //@ts-ignore
      rollupOptions,
      minify: 'esbuild',
      sourcemap: false,
      lib: {
        entry: resolve('packages/index.ts'),
        name: 'BrickUtils',
        fileName: format => `index.${format}.js`
      }
    }
  })
}