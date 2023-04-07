import { createApp } from 'vue'
import App from './App.vue'



import './style.scss'
import ElementPlus from 'element-plus'
// @ts-ignore 
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus, { locale: zhCn }).mount('#app')
