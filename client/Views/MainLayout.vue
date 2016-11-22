<template>
  <div class="content">
      <header class="">
        <nav>
          <div class="nav-wrapper grey lighten-3">
            <router-link to="/" class="brand-logo deep-orange-text left hide-on-small-only"><img src="img/logo.png" class="menu-logo"/></router-link>
            <ul class="right">
              <li>
                <router-link to="/createCompany" class="deep-orange-text">
                  Create your company
                </router-link>
              </li>
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
      </header>
      <main>
        <div class='row'>
            <div class='col s12'>
              <router-view></router-view>
            </div>
        </div>
        <div id="notifications" class="modal bottom-sheet">
          <div class="modal-content">
            <h4>Notifications</h4>
            <ul class="collection">
                          <li class="collection-item avatar">
                            <img src="images/yuna.jpg" alt="" class="circle">
                            <span class="title">Title</span>
                            <p>First Line <br> Second Line </p>
                            <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                          </li>
                          <li class="collection-item avatar">
                            <i class="material-icons circle">folder</i>
                            <span class="title">Title</span>
                            <p>First Line <br> Second Line </p>
                            <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                          </li>
                          <li class="collection-item avatar">
                            <i class="material-icons circle green">assessment</i>
                            <span class="title">Title</span>
                            <p>First Line <br> Second Line </p>
                            <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                          </li>
                          <li class="collection-item avatar">
                            <i class="material-icons circle red">play_arrow</i>
                            <span class="title">Title</span>
                            <p>First Line <br> Second Line </p>
                            <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                          </li>
                        </ul>
          </div>
        </div>
      </main>
    <footer class="page-footer">
      <div class="footer-copyright">
        <div class="container">
        © 2016 Copyright Text
        <router-link to="/admin" class="grey-text text-lighten-4 right">Administration</router-link>
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
    toggleNotifications: function () {
      console.log("ok");
      console.log($("#notifications"));
      console.log($("#notifications").modal);

      $('#notifications').modal('open');
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
    $(document).ready(function(){
      $('.materialboxed').materialbox();
      $('.modal').modal();
    });
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

.content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

</style>
