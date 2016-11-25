<template>
  <div style="margin-right:2.5%">
    <div class="card-panel white lighten-5 truncate">
      <div class="row">
        <div class="col s12">
          <h5>Connexion</h5>
          <span class="red-text">{{error}}</span>
        </div>
        <div class="col s12">
            <a v-on:click="fbLogin" class=" waves-effect waves-light btn blue darken-4">
              <i class="fa fa-facebook left"></i>facebook
            </a>
        </div>
    </div>
    </div>

    <form class="card-panel white lighten-5">
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" v-model="email">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model="password">
              <label for="password">Password</label>
            </div>
          </div>

          <div class="center-align">
              <div>
                  <div class="row">
                    <button class="btn waves-effect waves-light red darken-2" type="submit" v-on:click="changeText">Connexion
                      <i class="material-icons right">send</i>
                    </button>
                  </div>

                  <div class="row">
                  <router-link class="grey-text darken-4" to="/login/new">Pas encore de compte ? <br class="hide-on-med-and-up" /> Cliquez ici pour vous inscrire</router-link>
                  </div>
              </div>
          </div>

    </form>
  </div>
</template>

<script>

import {authenticate, setToken, me, loginWithFacebook} from "../ApiClient"
//import router from "../router"
import store from "../store"

export default {
  data() {
    return {
      error: null,
      email: null,
      password: null
    }
  },
  methods: {
    changeText: function (e) {
      e.preventDefault()
      authenticate(this.email, this.password)
      .then((data) => {
        let {token} = data
        this.$root.store.setUserToken(token)
        this.$router.push({path: '/'})
      })
      .catch(e =>{
        console.error(e);
        this.error = "wrong email and password"
      })
    },
    fbLogin() {
      console.log(123456);
      let self = this
      window.fbAsyncInit = function() {
        console.log("ok");
          FB.init({
            appId      : process.env.FB_ID,
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.8
          });
          console.log(FB);
          // Now that we've initialized the JavaScript SDK, we call
          // FB.getLoginStatus().  This function gets the state of the
          // person visiting this page and can return one of three states to
          // the callback you provide.  They can be:
          //
          // 1. Logged into your app ('connected')
          // 2. Logged into Facebook, but not your app ('not_authorized')
          // 3. Not logged into Facebook and can't tell if they are logged into
          //    your app or not.
          //
          // These three cases are handled in the callback function.

          FB.login((data) => {
            loginWithFacebook(data.authResponse.accessToken)
            .then(res => {
              console.log(res);
              self.$root.store.setUserToken(res.token)
              self.$router.replace({path: '/'})
            })
          })



      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  },
}

</script>

<style>

.logo {
  //height: 150px; width: 150px;
}

.tab-content {
  padding: 10px;
}

.title {
  font-size: 18px;
}
</style>
