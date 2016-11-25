<template lang="html">
  <div class="row">
    <div class="col s12 m6 l4 red lighten-5" v-for="p in products">
      <product
        v-bind:id="p.id"
        v-bind:title="p.Name"
        v-bind:price="p.price"
        v-bind:description="p.desc"
        v-bind:quantityLeft="p.quantity"
        v-bind:productImage="p.image"
        v-bind:company="{id: $route.params.companyId}"
        type="Awimarket"
      />
    </div>
  </div>
</template>

<script>
import Product from "../../Components/Product.vue"
import {fetchCompany} from "../../ApiClient"

export default {
  components: {
    'product': Product,
  },
  data() {
    return {
      products: [],
    }
  },
  beforeCreate() {
    fetchCompany(this.$route.params.companyId)
    .then(data => {
      this.products = data.products
    })
  },
}
</script>

<style lang="css">
</style>
