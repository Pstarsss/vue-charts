import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:4500/api/',
  timeout: 2000
})
Vue.prototype.$http = axiosInstance
Vue.prototype.$echarts = window.echarts
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
