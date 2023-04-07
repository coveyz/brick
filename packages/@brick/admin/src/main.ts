import { createApp } from 'vue'
import ElementPlus from 'element-plus';
// @ts-ignore 
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { MotionPlugin } from '@vueuse/motion';

import App from './App.vue'
import router from '@/router';
import { setupStore } from '@/store';
import config from '@/setting'; //todo
import { injectResponseStorage, checkUpdate } from '@/utils/tools';

//* 引入公共样式
import '@/styles/tailwind.css'
import '@/styles/index.scss';
import 'element-plus/dist/index.css';

import '@/permission'
import '@/icons'

//* 重新部署 通知用户更新
// const up = new checkUpdate({ timer: 2000 })
// up.on('no-update', () => {
//   console.log('未更新')
// })
// up.on('update',() => {
//   console.log('update')
// })

const app = createApp(App);
//❗️ 测试 pnpm 字应用 组件
// import AdminBox from '@brick/admin-box';
// app.use(AdminBox)
//❗️ 测试 pnpm 字应用 组件

setupStore(app)
injectResponseStorage(app, config)

app.use(MotionPlugin).use(router).use(ElementPlus, {
  locale: zhCn,
}).mount('#app')
