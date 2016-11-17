
import Vue from 'vue/dist/vue.js'
import VueRouter from "vue-router"

import Login from "./Views/Login.vue"
import Subscribe from "./Views/Subscribe.vue"
import LoginLayout from "./Views/LoginLayout.vue"
import Home from "./Views/Home.vue"
import MainLayout from "./Views/MainLayout.vue"


import store from "./store"

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: LoginLayout,
      children: [
        {path: '', component: Login},
        {path: 'new', component: Subscribe},
      ]
    },
    {
      path: '/',
      meta: { secure: true },
      component: MainLayout,
      children: [
        {path: '', component: Home}
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  let connected = false
  console.log(to.meta.secure);
  let secure = to.matched.some(record => record.meta.secure)
  if(secure) {
    if(store.state.user) {
      next()
    }
    else {
      next('/login')
    }
  }
  else {
    next()
  }
})

export default router
