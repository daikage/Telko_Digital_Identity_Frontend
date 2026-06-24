import { createRouter, createWebHistory } from 'vue-router'
import { Preferences } from '@capacitor/preferences';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/Landing.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () => import('../views/ForgotPassword.vue')
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: () => import('../views/ResetPassword.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/edit',
      name: 'editProfile',
      component: () => import('../views/EditProfile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/@:username',
      name: 'publicProfile',
      component: () => import('../views/PublicProfile.vue')
    },
    {
      path: '/admin/users',
      name: 'adminUsers',
      component: () => import('../views/admin/AdminUsers.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { value } = await Preferences.get({ key: 'auth_token' });
  const isAuthenticated = !!value;
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
