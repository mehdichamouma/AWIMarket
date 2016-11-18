<template>
  <div>
    <div class="">
      <nav>
        <div class="nav-wrapper grey lighten-3">
          <a href="#!" class="brand-logo deep-orange-text left"><img src="img/logo.png" class="menu-logo"/></a>
          <ul class="right">
            <li>
              <a v-on:click="toggleNotifications" class="deep-orange-text"><i class="material-icons">shopping_cart</i></a>
            </li>
            <li>
              <a v-on:click="toggleNotifications" class="deep-orange-text"><i class="material-icons">account_box</i></a>
            </li>
            <li>
              <a v-on:click="toggleNotifications" class="deep-orange-text"><i class="material-icons">notifications</i></a>
            </li>
          </ul>
        </div>

      </nav>

      <div v-if="showNotifications" class="awimarket-notifications grey lighten-4">
          <ul class="collection">
            <li class="collection-item">a</li>
            <li class="collection-item">b</li>
            <li class="collection-item">c</li>
            <li class="collection-item">d</li>
          </ul>
      </div>
    </div>
    <div class='row'>
        <div class='col s12'>
          <router-view></router-view>
        </div>
    </div>

  </div>
</template>

<script>
import io from "socket.io-client"

export default {
  data: function() {
    return {
      showNotifications: false
    }
  },
  methods: {
    toggleNotifications: function () {
      console.log("ok");
      this.showNotifications = !this.showNotifications
    }
  },
  created() {
    this.socket = io.connect('http://localhost:3010')
    this.socket.on('message', (data) => {
      console.log(data);
    })
    this.socket.emit('sendMessages', {my: 'data'})
    console.log("creation");
  }
}
</script>

<style>

.menu-logo {
  height: 30px;
  //width: 100px;
  color: "abc"
}

.awimarket-notifications {
  width: 100%;
  padding: 0;
  //position: absolute;
}

.notifications-content {
  background-color: blue;
  margin: auto;
  width: 90%;
  position: relative;
}
</style>
