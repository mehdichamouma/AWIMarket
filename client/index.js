import Vue from 'vue/dist/vue.js'

let vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

setTimeout(() => vm.message = "test", 5000)
