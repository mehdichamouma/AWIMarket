import Vue from 'vue/dist/vue.js'
import {fetchUserJournals} from "./api"

let vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    changeText: () => {
      console.log(fetchUserJournals());
      fetchUserJournals().then((data) => {
        vm.message = data
      })
    }
  }
})

setTimeout(() => vm.message = "test", 5000)
