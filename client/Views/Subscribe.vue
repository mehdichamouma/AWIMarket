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
             <input id="icon_prefix" type="text" class="validate" v-model="name">
             <label for="icon_prefix">Name</label>
           </div>
           <div class="input-field col s12 m12 l6">
             <i class="material-icons prefix">email</i>
             <input id="icon_prefix" type="text" class="validate" v-model="email">
             <label for="icon_prefix">Email</label>
           </div>
           <div class="input-field col s12 m12 l6">
             <i class="material-icons prefix">vpn_key</i>
             <input id="icon_prefix" type="password" class="validate" v-model="password">
             <label for="icon_prefix">Password</label>
           </div>
           <div class="input-field col s12 m12 l6">
             <i class="material-icons prefix">phone</i>
             <input id="icon_telephone" type="tel" class="validate" v-model="phone">
             <label for="icon_telephone">Telephone</label>
           </div>


         </div>
         <div class="row">
           <file-upload v-on:fileUploaded="handleFile"/>
         </div>

        </form>
    </div>

          <div class="center-align">
              <div>
                  <div class="row" >
                    <div>
                      <button class="btn waves-effect waves-light red darken-2"  type="submit" v-on:click="handleSignup">Sign Up
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
              </div>
          </div>

    </div>
  </div>
</template>

<script>

import {authenticate, signup} from "../ApiClient"
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
      email: null,
      password: null,
      profilePicture: null,
      phone: null,
      name: null
    }
  },
  methods: {
    handleSignup() {
      console.log("ok");
      let {email, password, profilePicture, phone, name} = this
      signup({email, password, profilePicture, phone, name})
      .then(res => {
        if(res.ok) {
          res.json().then(data => {
            let {token} = data
            this.$root.store.setUserToken(token)
            this.$router.push({path: '/'})
          })
        }
        else {
          this.error = "Email is already taken"
        }
      })
    },
    handleFile(file) {
      this.profilePicture = file.fileName
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
