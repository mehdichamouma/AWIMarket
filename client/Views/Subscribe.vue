<template>
  <div>
    <div class="card-panel white lighten-5 truncate">
      <span class="title">Subscribe</span><br>
      <span class="red-text">{{error}}</span>
      </div>
        <div class="card-panel white lighten-5">
        <div class="row">
        <form class="col s12">
         <div class="row">
           <div class="input-field col s12 m12 l6">
             <i class="material-icons prefix">account_circle</i>
             <input id="icon_prefix" type="text" class="validate">
             <label for="icon_prefix">First Name</label>
           </div>
           <div class="input-field col s12 m12 l6">
             <i class="material-icons prefix">email</i>
             <input id="icon_prefix" type="text" class="validate">
             <label for="icon_prefix">Email</label>
           </div>
           <div class="input-field col s12 m12 l6">
             <i class="material-icons prefix">vpn_key</i>
             <input id="icon_prefix" type="text" class="validate">
             <label for="icon_prefix">Password</label>
           </div>
           <div class="input-field col s6 m12 l6">
             <i class="material-icons prefix">phone</i>
             <input id="icon_telephone" type="tel" class="validate">
             <label for="icon_telephone">Telephone</label>
           </div>
         </div>
        </form>
    </div>

          <div class="right-align">
              <div>
                  <div class="row" >
                    <button class="btn waves-effect waves-light green accent-3 darken-2 col s6 offset-s3"  type="submit" v-on:click="changeText">Sign Up
                      <i class="material-icons right">send</i>
                    </button>
                  </div>
                  <div class="row">
                  <router-link class="grey-text darken-4" to="/login/new">Pas encore de compte ? Cliquez ici pour vous inscrire</router-link>
                  </div>
              </div>
          </div>

    </div>
  </div>
</template>

<script>

import {authenticate} from "../ApiClient"
//import router from "../router"
import store from "../store"

export default {
  data() {
    return {
      error: null,
      email: "john@doe.fr",
      password: "azerty"
    }
  },
  methods: {
    changeText: function () {
      authenticate(this.email, this.password)
      .then((data) => {
        store.setUserAction("abc")
        this.$router.push({path: '/'})
        this.error = data.token
      })
      .catch(e => {
        this.error = "wrong email and password"
      })
    }
  }
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
