<template>
  <div>
    <div class="parallax-container valign-wrapper">
      <div class="parallax">
        <img src="/img/classic-living-room-style.jpg" />

      </div>
      <div class="row valign center-align">
        <div class="col s12">
          <h4 class="grey-text text-lighten-4">AWIMarket,</h4>
          <h2 class="white-text">Another Way to Imagine the market.</h2>
        </div>
      </div>
    </div>
    <div class="row">
        <div class="card-panel z-depth-0 grey lighten-5">
          <div class="row">
            <nav>
              <div class="nav-wrapper">
                <form>
                  <div class="input-field">
                    <input id="search" type="search" v-on:input="search($event)" required placeholder="Browse products">
                    <label for="search"><i class="material-icons">search</i></label>
                    <i class="material-icons">close</i>
                  </div>
                </form>
              </div>
            </nav>
          </div>
          <div class="row">
            <div v-for="(p, index) in products" class="col s12 m6 l4" :key="p.product.id">
              <product
                v-bind:id="p.product.id"
                v-bind:title="p.product.Name"
                v-bind:price="p.product.price"
                v-bind:description="p.product.desc"
                v-bind:quantityLeft="p.product.quantity"
                v-bind:productImage="p.product.image"
                v-on:cartClick="handleCartClick(index)"
                v-bind:company="p.seller"
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
import {debounce} from "lodash"

let debouncedFetchProducts = debounce(fetchProducts, 150)

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
    $(document).ready(function(){
      $('.parallax').parallax();
    });
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
    },
    search(e) {
      console.log(e);
      let {value} = e.target
      debouncedFetchProducts(value)
      .then(products => {
        this.products = products
      })
    }
  },
}
</script>
