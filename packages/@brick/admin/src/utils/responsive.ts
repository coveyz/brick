import { App } from 'vue';
import Storage from 'responsive-storage';

const nameSpace = 'admin-'

const injectResponseStorage = (app: App, config: ServerConfigs) => {
  // console.log('utils-tools-config=>', config)
  const configObj = Object.assign({
    layout: Storage.getData('layout', nameSpace) ?? {
      theme: config.Theme ?? 'default',
      darkMode: config.DarkMode ?? false
    }
  })

  app.use(Storage, { nameSpace, memory: configObj })
}

export default injectResponseStorage