// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import VueLazyLoad from 'vue-lazyload'
import infinitScroll from 'vue-infinite-scroll'
import {currency} from './utils/currency'
import Vuex from 'Vuex'

Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading:'/static/loading-svg/loading-bars.svg'
})
Vue.use(Vuex)

Vue.use(infinitScroll)

//全局金额过滤器
Vue.filter("currency", currency)

//购物车信息
const store = new Vuex.Store({
  state:{
    nickname: '',
    cartCount: 0
  },
  mutations:{
    updateUser(state, nickname) {
      state.nickname = nickname
    },
    updateCart(state, cartCount) {
      state.cartCount += cartCount
    },
    initCart(state, cartCount) {
      state.cartCount = cartCount
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
//  render:h=>h(app)
})
