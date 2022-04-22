import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '',
    redirect: {name:'Principle'}
  },
  {
    path: '/principle',
    name: 'Principle',
    component: () => import('../views/Principle.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import( '../views/Home.vue')
    }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
