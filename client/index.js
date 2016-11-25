import "whatwg-fetch"

import VueRouter from "vue-router"
import Vue from "vue"

Vue.use(VueRouter)

//import store from "./store"
import router from "./router"
import App from "./Views/App.vue"
import store from "./store"
//import "./utils/facebook"

// const app = new Vue(Vue.util.extend({
//   router,
// }, App))



new Vue({
  el: '#app',
  router: router,
  data() {
    return {
      store: store
    }
  },
  render: h => h(App),
})
