import path from 'path';
import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';

import { pluginList } from './plugins'

type path = string;

const resolve = (dir: string): string => {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  // console.log('command=>', command)
  // console.log('mode=>', mode)
  return defineConfig({
    // plugins: [vue(), svgLoader()],
    plugins: pluginList(command),
    resolve: {
      alias: {
        "@": resolve('src')
      }
    },
  })
}
