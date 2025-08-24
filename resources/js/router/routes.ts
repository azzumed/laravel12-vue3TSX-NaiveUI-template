import { RouteRecordRaw } from 'vue-router'

export const createRoutes = (): RouteRecordRaw[] => {
  return [
    {
      path: '/',
      component: () => import('@/components/AppLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/pages/PageMain.vue'),
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import('@/pages/PageLogout.vue'),
        }
      ],
    },
    {
      path: '/',
      component: () => import('@/components/AuthLayout.vue'),
      children: [
        {
          path: '/sign-in',
          name: 'sign-in',
          component: () => import('@/pages/PageSignIn.vue'),
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: () => import('@/pages/PageSignUp.vue'),
        },
      ],
    }
  ]
}
