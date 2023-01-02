import { createRouter, RouterScrollBehavior, RouteRecordRaw, createWebHashHistory } from 'vue-router';

//* Userlayout
const UserLayout = () => import('@/layout/UserLayout/index.vue')

//* 常规路由
export const constantsRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "/user/login",
        component: () => import('@/views/login/index.vue'),
        meta: { hidden: true }
      },
      {
        path: '/user/register',
        component: () => import('@/views/register/index.vue'),
        meta: { hidden: true }
      }
    ]
  }
]

export const asynvRoutes: RouteRecordRaw[] = []

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