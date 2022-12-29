import { createApp } from 'vue'
import ElementPlus from 'element-plus';

import App from './App.vue'
import router from '@/router';

//* 引入公共样式
import '@/styles/index.scss';
// import 'element-plus/dist/index.css'

const app = createApp(App);

app.use(ElementPlus).use(router)
app.mount('#app')
