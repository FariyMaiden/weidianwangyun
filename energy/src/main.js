// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import echarts from 'echarts'
import "babel-polyfill" // es6适用于ie9以上的操作

Vue.use(echarts)
Vue.prototype.$echarts = echarts //图表使用引入
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.use(ElementUI)
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  components: {
    App
  },
  template: '<App/>'
})
