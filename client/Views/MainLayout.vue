<template>
  <div class="content">
      <header class="">
        <nav>
          <div class="nav-wrapper grey lighten-3">
            <router-link to="/" class="logo-container left center-align valign-wrapper">
              <div class="valign">
                <span class="deep-orange-text logo">
                  <i id="icon" class="fa fa-opencart"></i>
                  <span class="hide-on-small-only grey-text text-lighten-0">AWIMarket</span>
                </span>
              </div>
            </router-link>
            <ul class="right">
              <li>
                <router-link to="/cart" class="deep-orange-text">
                  <i class="material-icons left">shopping_cart</i>
                  {{ $root.store.state.cart.content.length}}
                </a>

              </li>
              <li>
                <router-link :to="{name:'profile', params: {userId: userId}}" class="deep-orange-text">
                  <div class="crop">
                      <img v-bind:src="profilePicture" />
                  </div>
                </router-link>
              </li>
              <li>
                <a v-on:click="toggleNotifications" class="deep-orange-text">
                  <i class="material-icons left">notifications</i>
                  4
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
      </header>
      <main>
        <div id="notifications" class="modal bottom-sheet">
          <div class="modal-content">
            <h4>Notifications</h4>
            <ul class="collection">
              <router-link :to="notification.to" class="collection-item avatar" v-for="notification in notifications">
                <img class="circle" :src="notification.imageSource" width="50"/>
                <span class="title">Notification</span>
                <p>{{notification.text}}</p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
            </ul>
          </div>
        </div>
        <router-view></router-view>
      </main>

    <footer class="page-footer">
      <div class="container">
        <h5 class="white-text">AWIMarket</h5>
        <ul>
          <li v-if="isAdmin">
            <router-link to="/admin" class="grey-text text-lighten-4">
              Administration
            </router-link>
          </li>
          <li v-if="userCompany">
            <router-link :to="{name: 'showCompany', params: {companyId: userCompany.id}}" class="grey-text text-lighten-4">
              Manage {{userCompany.nameSc}}
            </router-link>
          </li>
          <li v-else>
            <router-link to="/createCompany" class="grey-text text-lighten-4">
              Create your company
            </router-link>
          </li>
        </ul>
      </div>
      <div class="footer-copyright">
        <div class="container">
        © 2016 Copyright Text
        </div>
      </div>
    </footer>

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
    toggleNotifications: function (e) {
      console.log("ok");
      console.log($("#notifications"));
      console.log($("#notifications").modal);
      $(document).ready(function(){
        $('.modal').modal();
        $('#notifications').modal('open');
      });
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
      this.$root.store.addNotification(data)
      $(document).ready(function(){
        $('.modal').modal();
        $('#notifications').modal('open');
      });
    })
  },
  computed: {
    profilePicture() {
      return this.$root.store.state.user.user.profilePicture
    },
    userId() {
      return this.$root.store.state.user.user.id
    },
    isAdmin() {
      return this.$root.store.state.user.user.is_admin
    },
    userCompany() {
      return this.$root.store.state.user.company
    },
    notifications() {
      console.log(this.$root.store.state.user.notifications);
      return this.$root.store.state.user.notifications
      .filter(n => n.type)
      .map(n => {
        let o = {}
        console.log(n);
        switch (n.type) {
          case 'NEW_COMMAND':
            o.text = `A new order from ${n.content.user.name} has to be invalidate`
            o.to = {name: 'showOrder', params: {orderId: n.commandId}}
            o.imageSource = n.content.user.profilePicture
            break;
          default:
        }
        return o
      })
    }
  }
}
</script>

<style>
.logo {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
  font-size: 24px;
  margin-left: 5px;
}
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

.content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

.crop {
  height: 64px;
  width: 40px;
  overflow: hidden;
  padding: 11px 2px;
}

.crop img {
  width: 40px;
  margin: auto;
  border: 2px rgba(255, 255, 255, 1);
}
</style>
