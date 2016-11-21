<template lang="html">
  <h1>{{productTitle}}</h1>
</template>

<script>
import {fetchProduct} from "../ApiClient"

export default {
  data() {
    return {
      productTitle: null
    }
  },
  beforeCreate() {
    let {productId} = this.$route.params
    fetchProduct(productId)
    .then(res => res.json())
    .then((data) => {
      this.productTitle = data.product.Name
    })
  }
}
</script>

<style lang="css">
</style>
