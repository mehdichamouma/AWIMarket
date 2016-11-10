import Vue from 'vue/dist/vue.js'
import {fetchUserJournals, authenticate} from "./api"

let vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    email: "john@doe.fr",
    password: "azerty"
  },
  methods: {
    changeText: function () {
      authenticate(this.email, this.password)
      .then((data) => {
        vm.message = data.token
      })
      .catch(e => {
        vm.message = "wrong email and password"
      })
    }
  }
})

setTimeout(() => vm.message = "test", 5000)
