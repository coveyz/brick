import { useRouter } from 'vue-router';


export const useNav = () => {
  const routers = useRouter().options.routes;

  const menuSelect = (indexPath: string, routes: any) => {
    console.log('menuSelect=>', indexPath)
    console.log('routes=>', routes)
  }


  return {
    routers,
    menuSelect
  }
}