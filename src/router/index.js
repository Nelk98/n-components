import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/loading'
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('@/views/loading/Loading')
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import('@/views/drag/Drag')
  },
  {
    path: '/waterfall',
    name: 'waterfall',
    component: () => import('@/views/waterfall/Waterfall')
  }
]

const router = new Router({
  routes: routes,
  mode: 'history'
})

export default router