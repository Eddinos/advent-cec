import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:number?',
      name: 'home',
      component: HomeView,
      props: true,
      meta: {
        transition: 'zoom'
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
      props: setPropsDays(),
      meta: {
        transition: 'zoom'
      }
    },
  ],
})

function setPropsDays () {
  const currentDate = new Date().getDate()
  return {days: Array.from({length: Math.min(25, currentDate)}, (_, i) => i + 1)}
}

export default router
