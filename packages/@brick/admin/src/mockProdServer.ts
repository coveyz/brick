import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const moduleFiles: Record<string, any> = import.meta.glob('../mock/*.ts', { eager: true });

console.log('mockProdServe=>', moduleFiles);

const mockModules = Object.keys(moduleFiles).reduce((modules: any, modulePath: any) => {
  modules.push(...moduleFiles[modulePath].default)
  return modules
}, [])

export function setupProdMockServer() {
  return createProdMockServer(mockModules);
}