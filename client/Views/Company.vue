<template lang="html">
<div class="row">
  <div class="col s12 l3">
    <div class="row">
      <div class="col s12 card-panel z-depth-0">
        <img :src="imageSource" class="col s12"/>
        <h4>{{name}}</h4>
        <h5 class="grey-text text-lighten-2">{{siret}}</h5>
      </div>
      <div class="col s12">
        <div v-if="isOwner" class="collection">
          <router-link active-class="active" :to="{name: 'showCompanyProducts', params: {companyId: companyId}}"class="collection-item">{{name}}</router-link>
          <router-link active-class="active" :to="{name: 'showCompanySales', params: {companyId: companyId}}"class="collection-item">Sales</router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="col s12 l9">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import {fetchCompany} from "../ApiClient"
export default {
  data() {
    return {
      name: null,
      imageSource: null,
      siret: null,
      owner: {}
    }
  },
  beforeCreate() {
    fetchCompany(this.$route.params.companyId)
    .then(data => {
      this.name = data.company.nameSc
      this.imageSource = data.company.image
      this.siret = data.company.siret
      this.owner = data.owner
    })
  },
  computed: {
    isOwner() {
      return this.$root.store.state.user.user.id == this.owner.id
    },
    companyId() {
      return this.$route.params.companyId
    }
  },
}
</script>

<style lang="css">
</style>
