<template lang="html">
  <div class="row">
    <div class="col s12 m12 l5">
        <div class="row">
          <div class="col s12 m12 card-panel">
            <div class="row">
                <img class="col s12 m6" :src="user.profilePicture" />
                <div class="col s12 m6">
                  <h5>{{userName}}</h5>
                </div>
            </div>
          </div>
          <div class="col s12" v-if="company">
<h3>        <h5>{{userName}}'s company</h5>
          </div>
            <div class="col s12 card card-panel grey darken-1 z-depth-0" v-if="company">
              <div class="row card-content">
                    <img class="col s12 m4" :src="company.image" />
                    <div class="col s12 m8">
                      <div class="card card-panel">
                          <h5>{{company.nameSc}}</h5>
                          <span class="z-depth-0">SIRET: {{company.siret}}</span>
                      </div>
                    </div>
              </div>
              <div class="card-action center-align">
                  <a class="waves-effect waves-light btn-flat">Show company</a>
              </div>
            </div>
        </div>
    </div>
    <div class="col s12 m12 l7">
      <div class="row">
        <div class="col s12">
          <h5>{{userName}}'s journals</h5>
        </div>
      </div>
      <div class="row" v-if="true">
        <div class="col s12 card card-panel white">
          <form class="card-content">
                <div class="row">
                  <div class="input-field col s12">
                    <input id="first_name" type="text" class="validate">
                    <label for="first_name">Journal name</label>
                  </div>
                </div>
          </form>
          <div class="card-action">
            <a href="">Create a journal</a>
          </div>
        </div>
      </div>
      <div class="row" v-for="journal in journals">
        <div class="col s12 card card-panel teal">
          <div class="card-content">
            <h5>{{journal.title}}</h5>
          </div>
          <div class="card-action">
            <a href="">Open the journal</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchUser} from "../ApiClient"
import {capitalize} from "lodash"

export default {
  data() {
    return {
        company: null,
        journals: {},
        user: {}
    }
  },
  beforeCreate() {
    let {userId} = this.$route.params
    fetchUser(userId)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.company = data.company
      this.journals = data.journals
      this.user = data.user
    })
  },
  computed: {
    userName() {
      return this.user.name && this.user.name.split(" ").map(capitalize).join(" ")
    }
  }

}
</script>

<style lang="css">
</style>
