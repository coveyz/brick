import { createApp } from 'vue'
import ElementPlus from 'element-plus';

import App from './App.vue'
import router from '@/router';
import { setupStore } from '@/store';
import config from '@/setting'; //todo
import { injectResponseStorage } from '@/utils/tools';

//* 引入公共样式
import '@/styles/index.scss';
import 'element-plus/dist/index.css';
import '@/styles/tailwind.css'

const app = createApp(App);

setupStore(app)
injectResponseStorage(app, config)

app.use(router).use(ElementPlus).mount('#app')
