import HomeView from '@/pages/HomeView.vue'
import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/pages/ProjectView.vue'),
    },
    {
      path: '/projects/:id',
      name: 'single-project',
      component: () => import('@/pages/SingleProjectView.vue'),
    },
    {
      path: '/:cacthAll(.*)*',
      name: 'not-found',
      component: h('p', { style: 'color: red;' }, '404 not found'),
    },
  ],
})

export default router
