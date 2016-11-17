
import VueRouter from "vue-router"
import Vue from "vue"

Vue.use(VueRouter)

//import store from "./store"
import router from "./router"
import App from "./Views/App.vue"

// const app = new Vue(Vue.util.extend({
//   router,
// }, App))

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
