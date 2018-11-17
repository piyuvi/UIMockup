import Vue from 'vue'
import Router from 'vue-router'
import Wonder from '@/components/Wonder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wonder',
      component: Wonder
    }
  ]
})
