import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { viteMockServe } from 'vite-plugin-mock'

export function pluginList(command: string) {
  console.log('plugin=>', command)
  const prodMock = true;
  return [
    vue(),
    svgLoader(),
    viteMockServe({
      mockPath: 'mock', //* --设置模拟数据的存储文件夹，如果不是index.js需要写明完整路径
      localEnabled: command === 'serve', //* 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
      prodEnabled: command !== 'serve' && prodMock, //* 设置打包是否启用 mock 功能
      injectCode: `
        import {setupProdMockServer} from './mockProdServer';
        setupProdMockServer()
      `, //* injectCode代码注入的文件,默认为项目根目录下src/main.{ts,js}
      logger: true //* 是否在控制台显示请求日志
    })
  ]
}