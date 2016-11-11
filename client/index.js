import Vue from 'vue/dist/vue.js'
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Login from "./Views/Login.vue"
import Subscribe from "./Views/Subscribe.vue"
import LoginLayout from "./Views/LoginLayout.vue"


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
      meta: { secure: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let connected = false
  console.log(to.meta.secure);
  if(to.meta.secure) {
    if(connected) {
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

const app = new Vue({
  router
}).$mount('#app')
