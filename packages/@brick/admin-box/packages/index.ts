import { App } from 'vue';
import { attr, watermarkInfoType } from './types'

// hooks
import { useWatermark } from './hooks';
// components
// import HelloWorld from './App.vue';
export { useWatermark };
//types
export type { attr, watermarkInfoType }



const install = (app: App, opts = {}) => {
  // app.component('TestBox', HelloWorld)
}

export default {
  install
}