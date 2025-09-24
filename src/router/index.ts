import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/tasks.vue'),
    },
    {
      path: '/task/:id',
      name: 'taskDetails',
      component: () => import('@/pages/task-detail.vue'),
    },
  ],
  history: createWebHistory(),
})

export default router
