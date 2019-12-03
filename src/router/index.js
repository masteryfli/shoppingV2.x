import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import Confirm from '@/views/Confirm'
import OrderSucc from '@/views/OrderSucc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },{
      path: "/cart",
      name: 'Cart',
      component: Cart
    },{
      path: "/address",
      name: 'Address',
      component: Address
    },{
      path: "/confirm",
      name: "Confirm",
      component: Confirm
    },{
      path: "/orderSucc",
      name: "OrderSucc",
      component: OrderSucc
    }
  ]
})
