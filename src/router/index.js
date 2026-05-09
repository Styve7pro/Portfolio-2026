import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { authenticated } from '@/stores/admin.js'

const routes = [
  { path: '/',                name: 'home',           component: Home },
  { path: '/about',           name: 'about',          component: () => import('@/views/About.vue') },
  { path: '/services',        name: 'services',       component: () => import('@/views/Services.vue') },
  { path: '/skills',          name: 'skills',         component: () => import('@/views/Skills.vue') },
  { path: '/projects',        name: 'projects',       component: () => import('@/views/Projects.vue') },
  { path: '/projects/:id',    name: 'project-detail', component: () => import('@/views/ProjectDetail.vue') },
  { path: '/certifications',  name: 'certifications', component: () => import('@/views/Certifications.vue') },
  { path: '/contact',         name: 'contact',        component: () => import('@/views/Contact.vue') },
  // Admin — accès discret via /#/x-admin
  { path: '/x-admin',         name: 'admin-login',    component: () => import('@/views/admin/AdminLogin.vue') },
  { path: '/x-admin/panel',   name: 'admin-panel',    component: () => import('@/views/admin/AdminPanel.vue'),
    beforeEnter: (to, from, next) => { authenticated.value ? next() : next('/x-admin') } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
