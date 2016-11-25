<template lang="html">
<div>
  <div class="row">
    <div class="col s12 card-panel z-depth-0">
      <h1>{{name}}</h1>
      <h5 class="grey-text text-lighten-3">{{siret}}</h5>
    </div>
    <div class="col s12">
      <div v-if="isOwner" class="collection">
        <router-link :to="{name: 'showCompany', params: {companyId: companyId}}"class="collection-item">{{name}}</router-link>
        <router-link :to="{name: 'showCompanySales', params: {companyId: companyId}}"class="collection-item">Sales</router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
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
      products: [],
      owner: {}
    }
  },
  beforeCreate() {
    fetchCompany(this.$route.params.companyId)
    .then(data => {
      this.name = data.company.nameSc
      this.imageSource = data.company.image
      this.siret = data.company.siret
      this.products = data.products
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
