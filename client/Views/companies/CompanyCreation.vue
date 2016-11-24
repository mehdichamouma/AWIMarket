<template lang="html">
  <div class="row">
  <div class="col s12 l6">
    <h3>Create your Selling Company</h3>
    <div class="card-panel z-depth-0 grey lighten-5">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </div>
    <div class="col s12 l6">

      <div class="col s12">
        <div class="card-panel z-depth-0 grey lighten-5">
          <div class="row">
            <div class="input-field col s12 m7">
              <input id="company_name" type="text" class="validate" v-model="companyName">
              <label for="company_name">Company name</label>
            </div>
            <div class="input-field col s12 m5">
              <input id="siret" type="text" class="validate" v-model="companySiret">
              <label for="siret">SIRET</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea" v-model="companyDescription"></textarea>
              <label for="textarea1">Tell us something about your company</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <file-upload v-on:fileUploaded="setCompanyImage"/>
            </div>
          </div>
          <div class="row">
            <div class="right-align">
            <button v-on:click="createCompany" class="btn waves-effect waves-light" name="action">Create
              <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>

      </div>

</div>
</template>

<script>
import ImageUpload from "../../Components/ImageUpload.vue"
import {createCompany, refreshToken} from "../../ApiClient"

export default {
  data() {
    return {
        image: null,
        companyName: null,
        companySiret: null,
        companyDescription: null,
        userPassword: null
    }
  },
  components: {
    "file-upload": ImageUpload
  },
  methods: {
    setCompanyImage(data) {
      console.log(data);
      this.image = data.fileName
    },
    createCompany() {
      let {
        image,
        companyName,
        companySiret,
        companyDescription,
        userPassword
      } = this
      console.log(image, companyName, companySiret, companyDescription, userPassword);
      createCompany({
        image,
        companyName,
        siret: companySiret,
        description: companyDescription,
      })
      .then(res => {
        if(res.ok) {
          res.json().then((data) => {
            refreshToken(this.$root.store.getUserToken())
            .then((data) => {
              this.$root.store.setUserToken(data.token)
              this.$root.store.setUserAction(null)
              this.$router.replace({name: "showCompany", params: {companyId: data.id}})
            })
          })
        }
        else {
          this.error = "Company creation failed"
        }
      })
      .catch(e => {
        this.error = "Company creation failed"
        console.error(e)
      })
    }
  }
}
</script>

<style lang="css">
</style>
