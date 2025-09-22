import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/tasks.vue'),
    },
  ],
  history: createWebHistory(),
})

export default router
