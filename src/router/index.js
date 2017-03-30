import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Calculator from '@/components/Calculator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Hello',
      path: '/',
      component: Hello
    },
    {
      name: 'CalculatorView',
      path: '/calculator',
      component: Calculator }
  ]
})
