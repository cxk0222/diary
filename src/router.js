import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { navShow: true }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('./views/My.vue'),
      meta: { navShow: true }
    },
    {
      path: '/date',
      name: 'date',
      component: () => import('./views/Date.vue'),
      meta: { navShow: false }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/Detail.vue'),
      meta: { navShow: false }
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./views/Add.vue'),
      meta: { navShow: false }
    },
    {
      path: '/month',
      name: 'month',
      component: () => import('./views/Month.vue'),
      meta: { navShow: false }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue'),
      meta: { navShow: false }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: { navShow: false }
    }
  ]
})
