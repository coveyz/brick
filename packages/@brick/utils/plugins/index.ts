import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';

export function pluginList(command: string) {
  // console.log('pluginList-command=>', command);
  return [
    vue(), vueJsx()
  ]
}