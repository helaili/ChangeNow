import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Calculator from '@/components/Calculator'
import Users from '@/components/Users'

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
      component: Calculator
    },
    {
      name: 'UsersView',
      path: '/users',
      component: Users
    }
  ]
})
