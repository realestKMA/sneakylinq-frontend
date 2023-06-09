import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import DashBoardView from '../views/DashBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: {name: "dashboardwelcome"},
      component: DashBoardView,
      children: [
        {
          path: "",
          name: "dashboardwelcome",
          component: () => import('../components/DashboardWelcome.vue')
        },
        {
          path: "new-linq",
          name: "newlinq",
          component: () => import('../components/DashboardNewLinq.vue')
        },
        {
          path: "chat",
          name: "dashboardchat",
          component: () => import('../components/DashBoardChat.vue')
        },
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
