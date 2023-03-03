import { App } from 'vue';

// hooks
import { useWatermark } from './hooks';
// components
// import HelloWorld from './App.vue';
export { useWatermark };



const install = (app: App, opts = {}) => {
  // app.component('TestBox', HelloWorld)
}

export default {
  install
}