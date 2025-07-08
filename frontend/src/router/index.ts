import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

const routes = [
  { path: '/', component: App },
  {
    path: '/tracks',
    component: () => import('@/features/tracks/views/TracksView.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
