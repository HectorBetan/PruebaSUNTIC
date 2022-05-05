import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/registro-component.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login-component.vue')
  },
  {
    path: '/fin/:id',
    name: 'fin',
    component: () => import('../components/fin-component.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
