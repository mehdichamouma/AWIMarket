<template>
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="card-panel hoverable">
        <h3>Welcome to AWI MARKET !!!!!</h3>
        <nav>
          <div class="nav-wrapper">
            <form>
              <div class="input-field">
                <input id="search" type="search" required placeholder="Browse products">
                <label for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
        <div class="row">
          <div v-for="(p, index) in products" class="col s12 m6 l4">
            <product
              v-bind:title="p.Name"
              v-bind:price="p.price"
              v-bind:description="p.desc"
              v-on:cartClick="handleCartClick(index)"
            />
          </div>
        </div>
      </div>
    </div>
  <div>
</template>

<script>

import Product from "../Components/Product.vue"
import {fetchProducts} from "../ApiClient"

export default {
  components: {
    'product': Product
  },
  data() {
    return {
      products: []
    }
  },
  beforeCreate() {
    fetchProducts().then(products => {
      console.log(products);
      this.products = products
    })
  },
  methods: {
    handleCartClick(index) {
      //PUSH PRODUCT IN THE BASKET
      let product = this.products[index]
      if(product) {
        this.$root.store.cartAddProduct(product, 2)
      }
    }
  }
}
</script>
