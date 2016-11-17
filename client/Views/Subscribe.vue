<template>
  <div>
    <div class="card-panel white lighten-5 truncate">
      <span class="title">Connexion</span><br>
      <span class="red-text">{{error}}</span>
    </div>
    <div class="card-panel white lighten-5">
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

          <div class="right-align">
              <div>
                  <div class="row">
                    <button class="btn waves-effect waves-light red darken-2" type="submit" v-on:click="changeText">Connexion
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
