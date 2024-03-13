import ScrumEstimationView from '@/views/ScrumEstimationView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // ToDo Exercise 4.2 Replace the default by an appropriated routing
  // ToDo Exercise 4.6 Name the routes
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'default',
      component: ScrumEstimationView
    }
  ]
})

export default router
