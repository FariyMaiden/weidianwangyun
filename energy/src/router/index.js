import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import main from '@/components/main'
import show from '@/components/show'


Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect: '/main/show',
      children: [{
        path: 'show',
        name: 'show',
        component: show
      }]
    },

  ]
})

export default router
