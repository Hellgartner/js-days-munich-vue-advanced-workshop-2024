import ScrumEstimationView from '@/views/ScrumEstimationView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultsView from '@/views/ResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/estimation',
      name: 'estimation',
      component: ScrumEstimationView
    },
    {
      path: '/result',
      name: 'result',
      component: ResultsView
    }
  ]
})

export default router
