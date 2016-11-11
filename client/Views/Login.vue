<template>

  <div class="card-panel teal lighten-2">
    <div class="card-panel grey lighten-4 truncate">
      {{ message }}
    </div>
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
    <router-link class="waves-effect waves-light btn" to="login/new">Inscription</router-link>
    <a class="waves-effect waves-light btn" v-on:click="changeText">Connexion</a>
  </div>

</template>

<script>

import {authenticate} from "../ApiClient"

export default {
  data() {
    return {
      message: 'Hello Vue!',
      email: "john@doe.fr",
      password: "azerty"
    }
  },
  methods: {
    changeText: function () {
      authenticate(this.email, this.password)
      .then((data) => {
        this.message = data.token
      })
      .catch(e => {
        this.message = "wrong email and password"
      })
    }
  }
}

</script>
