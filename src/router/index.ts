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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
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
  return {days: Array.from({length: Math.min(25, 31)}, (_, i) => i + 1)}
}

export default router
