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
    meta: { hidden: true },
    children: [
      {
        path: "/user/login",
        component: () => import('@/views/login/index.vue'),
        meta: { title: '登录', hidden: true }
      },
      {
        path: '/user/register',
        component: () => import('@/views/register/index.vue'),
        meta: { title: '注册', hidden: true }
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
    meta: { title: 'Permission',alwaysShow: false, icon: 'email', roles: ['admin', 'editor'] },
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
  }, 
  {
    path: '/able',
    component: BasicLayout,
    redirect: '/able/watermark',
    meta: {title: '功能',alwaysShow: true, icon: '2mp', roles: ['admin', 'editor']},
    children: [
      {
        path: 'watermark',
        component: () => import('@/views/able/watermark/index.vue'),
        name: 'watermark',
        meta: { title: '水印', roles: ['admin'] }
      },
      {
        path: 'copping',
        component: () => import('@/views/able/cropping/index.vue'),
        name: 'copping',
        meta: { title: '图片剪裁', roles: ['admin'] }
      },
      {
        path: 'search',
        component: () => import('@/views/able/search/index.vue'),
        name: 'search',
        meta: { title: '搜索', roles: ['admin'] }
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