import Vue from 'vue'
import Router from 'vue-router'
import Preview from './Preview.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'preview',
      path: '/:meta/:pattern?',
      component: Preview,
      props: true
    }
  ]
})
