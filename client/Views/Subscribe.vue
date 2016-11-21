<template>
  <div style="margin-right:2.5%">
    <div class=" center-align card-panel  red lighten-1  truncate">
      <span class=" white-text h1-text title">Subscribe</span><br>
      <span class="red-text">{{error}}</span>
      </div>
        <div class="card-panel white lighten-5">
        <div class="row">
        <form class="col s12">
         <div class="row">
           <div class="input-field col s12 m12 l6">
             <i class="material-icons prefix">account_circle</i>
             <input id="icon_prefix" type="text" class="validate">
             <label for="icon_prefix">Name</label>
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
           <div class="input-field col s12 m12 l6">
             <i class="material-icons prefix">phone</i>
             <input id="icon_telephone" type="tel" class="validate">
             <label for="icon_telephone">Telephone</label>
           </div>


         </div>
         <div class="row">
           <file-upload />
         </div>

        </form>
    </div>

          <div class="center-align">
              <div>
                  <div class="row" >
                    <div>
                      <button class="btn waves-effect waves-light red darken-2"  type="submit" v-on:click="changeText">Sign Up
                        <i class="material-icons right">send</i>
                      </button>
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
import ImageUpload from "../Components/ImageUpload.vue"


export default {
  components:{
    "file-upload": ImageUpload
  },
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
