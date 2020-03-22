import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '/',
        name: 'Manage Product',
        component: () => import('@/components/prodManage')
      },
      {
        path: '/user',
        name: 'Manage User',
        component: () => import('@/components/userManage')
      },
      {
        path: '/editProduct',
        name: 'Edit Product',
        component: () => import('@/components/editProduct')
      },
      {
        path: '/:anything',
        component: () => import('@/components/prodManage')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
