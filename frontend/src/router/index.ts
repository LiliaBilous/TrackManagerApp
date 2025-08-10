import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

const routes = [
  { path: '/', component: App },
  {
    path: '/tracks',
    component: () => import('@/pages/TracksView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/ErrorPage.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
