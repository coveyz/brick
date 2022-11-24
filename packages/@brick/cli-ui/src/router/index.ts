import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes:Array<RouteRecordRaw> = [
  {
    path: '/project/select',
    name: 'project-select',
    component: () => import('@/components/ProjectManager/ProjectSelect.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})


export default router