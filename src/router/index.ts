import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

export type IMyRouterConfig = RouteConfig & {
  expanded?: Boolean
}

export const routes: Array<IMyRouterConfig> = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页' },
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { title: '关于', hideSideBar: true }
  },
  {
    path: '/test',
    component: Layout,
    meta: { title: '测试' },
    redirect: '/test/index',
    children: [
      {
        path: '/test/index',
        name: 'Test',
        component: () => import(/* webpackChunkName: "test" */ '../views/test/index.vue'),
        meta: {
          title: '测试页面1'
        }
      },
      {
        path: '/test/time',
        name: 'Time',
        component: () => import(/* webpackChunkName: "test" */ '../views/test/time.vue'),
        meta: {
          title: '测试页面2'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
