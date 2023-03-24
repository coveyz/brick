import path from 'path';
import { defineConfig, ConfigEnv } from 'vite'
import { pluginList } from './plugins'
type path = string;

const resolve = (dir: string): string => {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  return defineConfig({
    plugins: pluginList(command),
    resolve: {
      alias: {
        "@": resolve('src')
      }
    },
  })
}
