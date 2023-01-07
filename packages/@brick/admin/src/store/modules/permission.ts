import { defineStore } from 'pinia';
import { constantsRoutes, asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { PermissionType } from './types'

/**🍌 确定用户是否具备权限 */
const hasPermission = (route: RouteRecordRaw, roles: string[]) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => (route.meta as any).roles.includes(role))
  } else {
    return true
  }
}

/** 🍌 递归过滤 路由表 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res = [] as RouteRecordRaw[]

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  })

  return res ;
}


export const usePermissionStore = defineStore('admin-permission', {
  state: (): PermissionType => ({
    addRoutes: [],
    routes: []
  }),
  actions: {
    SET_ROUTES(routes: RouteRecordRaw[]) {
      this.addRoutes = routes;
      this.routes = constantsRoutes.concat(routes);
    },
    /** 🍌 生成路由 */
    generateRoutes(roles: Array<string>) {
      return new Promise<RouteRecordRaw[]>((resolve) => {
        // console.log('cur-roles=>', roles);
        let accessRoutes;

        if (roles.includes('admin')) {
          accessRoutes = asyncRoutes || []
        }
        else {
          accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }

        this.SET_ROUTES(accessRoutes)
        resolve(accessRoutes)
      })
    }
  }
})