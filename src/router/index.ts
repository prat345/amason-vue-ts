import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/UserProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/product/:slug',
      name: 'Product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/placeorder',
      name: 'Placeorder',
      component: () => import('../views/PlaceOrderView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order-summary/:orderId',
      name: 'OrderSummary',
      component: () => import('../views/OrderSummaryView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order-history',
      name: 'OrderHistory',
      component: () => import('../views/OrderHistoryView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

const userData = computed(() => useUserStore().userData)

router.beforeEach((to, from, next) => {
  // console.log('router ', userData.value)
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !userData?.value) {
    // Redirect to sign-up if authentication is required but the user is not logged in
    next('/signin')
    return
  }
  if ((to.path === '/signup' || to.path === '/signin') && userData?.value) {
    // Redirect to profile if trying to access sign-up or sign-in when already logged in
    next('/profile')
    return
  }
  next()
})
export default router
