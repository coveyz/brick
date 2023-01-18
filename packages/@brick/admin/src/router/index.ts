import { createRouter, RouterScrollBehavior, RouteRecordRaw, createWebHashHistory } from 'vue-router';

//* Userlayout
const UserLayout = () => import('@/layout/UserLayout/index.vue')
const BasicLayout = () => import('@/layout/BasicLayout/index.vue');

//* 常规路由
export const constantsRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: "/user/login",
        component: () => import('@/views/login/index.vue'),
        hidden: true,
        meta: { title: '登录' }
      },
      {
        path: '/user/register',
        component: () => import('@/views/register/index.vue'),
        hidden: true,
        meta: { title: '注册' }
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'user', affix: true }
      }
    ]
  }
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/permission',
    component: BasicLayout,
    redirect: '/permission/page',
    alwaysShow: true,
    meta: { title: 'Permission', icon: '', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: { title: 'Page Permission', roles: ['admin'] }
      },
      {
        path: 'pageA',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermissionA',
        meta: { title: 'Page PermissionA', roles: ['admin'] }
      }
    ]
  }
]

export const resetRoutes = () => {
  const newRouter = routerFactory();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition;
  return { left: 0, top: 0 }
}

const routerFactory = () => createRouter({
  scrollBehavior: scrollBehavior,
  history: createWebHashHistory(),
  routes: constantsRoutes
})

const router = routerFactory()


export default router;