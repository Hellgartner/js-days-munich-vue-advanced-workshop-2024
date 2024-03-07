import ScrumEstimationView from '@/views/ScrumEstimationView.vue'
import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'default',
      component: ScrumEstimationView
    }
  ]
})

export default router
