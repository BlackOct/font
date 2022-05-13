import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//import LF from '@/components/LF'
import TurboAdpter from '@/components/TurboAdpter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Principle',
      component: () => import('../views/Principle.vue')
    },
    {
      path: '/TurboAdpter',
      name: 'TurboAdpter',
      component: TurboAdpter
    },
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
  ]
})
