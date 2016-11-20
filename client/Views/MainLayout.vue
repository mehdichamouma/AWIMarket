<template>
  <div>
    <div class="">
      <nav>
        <div class="nav-wrapper grey lighten-3">
          <router-link to="/" class="brand-logo deep-orange-text left hide-on-small-only"><img src="img/logo.png" class="menu-logo"/></router-link>
          <ul class="right">
            <li>
              <router-link to="/admin" class="deep-orange-text">Administration</router-link>
            <li>
              <router-link to="/cart" class="deep-orange-text">
                <i class="material-icons left">shopping_cart</i>
                {{ $root.store.state.cart.content.length}}
              </a>

            </li>
            <li>
              <a v-on:click="toggleNotifications" class="deep-orange-text"><i class="material-icons">account_box</i></a>
            </li>
            <li>
              <a v-on:click="toggleNotifications" class="deep-orange-text">
                <span class=" new badge" data-badge-caption="notifications">4</span>
              </a>
            </li>
            <li>
              <a v-on:click="logout" class="grey-text text-ligthen-3">
                <i class="material-icons">exit_to_app</i>
              </a>
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
import {getNotificationSocket, setToken} from "../ApiClient"

export default {
  data: function() {
    return {
      showNotifications: false,
    }
  },
  methods: {
    toggleNotifications: function () {
      console.log("ok");
      this.showNotifications = !this.showNotifications
    },
    logout() {
      setToken(null)
      this.$root.store.setUserAction(null)
      this.$root.store.setUserToken(null)
      localStorage.removeItem("userToken")
      this.$router.push("/login")
    }
  },
  created() {
    this.socket = getNotificationSocket()
    console.log("aa", this.socket);
    this.socket.on('notification', (data) => {
      console.log(data);
    })
    console.log("creation");
  }
}
</script>

<style>

.menu-logo {
  height: 22px;
  margin-left: 10px;
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
