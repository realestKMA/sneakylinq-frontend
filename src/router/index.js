import { createRouter, createWebHistory } from 'vue-router'
import ConnectView from '../views/ConnectView.vue'
import ScanConnectView from '../views/ScanConnectView.vue'
import DashBoardView from '../views/DashBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'connect',
      component: ConnectView
    },
    {
      path: '/connect/scan/:did',
      name: 'scanconnect',
      component: ScanConnectView,
      props: true,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoardView,
      redirect: {name: "dashboardwelcome"},
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
          component: () => import('../components/DashBoardChat.vue'),
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../components/AppNotFound.vue'),
      meta: {requiresAuth: false, transition: 100, transitionName: ""}
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
})

export default router
