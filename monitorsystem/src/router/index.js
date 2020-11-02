import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const Seller = () => import('@/views/Seller')
const Trend = () => import('@/views/Trend')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/seller'
  },
  {
    path: '/seller',
    name: 'Seller',
    component: Seller
  },
  {
    path: '/trend',
    name: 'Trend',
    component: Trend
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
