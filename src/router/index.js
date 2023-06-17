import { createRouter, createWebHistory } from 'vue-router'
import ConnectView from '../views/ConnectView.vue'
import ScanConnectView from '../views/ScanConnectView.vue'
import DashBoardView from '../views/DashBoardView.vue'
import HomeView from '../views/HomeView.vue'
import { useBase } from '../stores/base'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false, title: "Welcome | Sneaky Linq" }
    },
    {
      path: '/connect',
      name: 'connect',
      component: ConnectView,
      meta: { requiresAuth: false, title: "Linq up | Sneaky Linq" }
    },
    {
      path: '/connect/scan/:did',
      name: 'scanconnect',
      component: ScanConnectView,
      props: true,
      meta: { requiresAuth: false, title: "Scan | Alias | Sneaky Linq" }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoardView,
      redirect: { name: "dashboardwelcome" },
      meta: { requiresAuth: true, title: "Dashboard | Sneaky Linq" },
      children: [
        {
          path: "",
          name: "dashboardwelcome",
          component: () => import('../components/DashboardWelcome.vue'),
          meta: { requiresAuth: true, title: "Dashboard | Sneaky Linq" },
        },
        {
          path: "new-linq",
          name: "newlinq",
          component: () => import('../components/DashboardNewLinq.vue'),
          meta: { requiresAuth: true, title: "New linq | Sneaky Linq" }
        },
        {
          path: "chat",
          name: "dashboardchat",
          component: () => import('../components/DashBoardChat.vue'),
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../components/AppNotFound.vue'),
      meta: {
        requiresAuth: false,
        title: "Page not found | Sneaky Linq"
      }
    },
  ],
})

router.beforeEach(async (to, from) => {
  // stores
  const useBaseStore = useBase()
  
  // data
  let deviceData = useBaseStore.device?.data || []
  let isAuthenticated = 'alias' in deviceData

  if (isAuthenticated && (to.name == 'home' || to.name == 'connect')) {
    console.log(`Home || Connect: ${to.name}`)
    return {name: 'dashboard'}
  }

  else if (to.meta.requiresAuth && !isAuthenticated) {
    console.log(`Route: ${to.name}`)
    return {name: 'connect'}
  }

  document.title = to.meta?.title || "Sneaky Linq"
})

export default router
