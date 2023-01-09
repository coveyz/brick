
const iconsFiles: Record<string, any> = import.meta.glob('./svg/*.svg', { eager: true });


export const iconModules = Object.keys(iconsFiles).reduce((modules: any, modulePath: string) => {
  const moduleName = modulePath.replace('/svg', '').replace(/^\.\/(.*)\.\w+$/, "$1");
  modules[moduleName] = iconsFiles[modulePath].default;
  return modules
}, {})

