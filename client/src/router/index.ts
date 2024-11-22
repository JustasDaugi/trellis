import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { isLoggedIn } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'MainView',
      component: () => import('../views/MainView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/board/:id',
      name: 'Board',
      component: () => import('../views/BoardView.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (isLoggedIn.value) {
    if (to.name === 'Login' || to.name === 'Signup' || to.name === 'Home') {
      next({ name: 'MainView' })
    } else {
      next()
    }
  } else {
    if (to.name === 'MainView' || to.path.startsWith('/dashboard') || to.name === 'Board') {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
})

export default router
