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
                v-bind:company="p.seller"
                type="Awimarket"
              />
            </div>
          </div>
        </div>
    </div>
    <div class="row">
      <div class="card-panel z-depth-0 red lighten-3">
        <div class="row">
          <h3 class="white-text">Partners' products</h3>
        </div>
        <div class="row">
          <div v-for="(pro, index) in partnersProducts" class="col s12 m6 l4" :key="pro.product.id">
            <product
              v-bind:id="pro.product.id"
              v-bind:title="pro.product.Name"
              v-bind:price="pro.product.price"
              v-bind:description="pro.product.desc"
              v-bind:quantityLeft="pro.product.quantity"
              v-bind:productImage="pro.product.image"
              v-on:cartClick="handleCartClick(index)"
              v-bind:company="pro.seller"
              type="partner"
              v-bind:partnerName="pro.partnerName"
              v-bind:partnerLink="pro.partnerLink"
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
import {fetchPartnersProducts, fetchPartnersProductsReda} from "../utils/partners"

import {debounce, floor} from "lodash"

let debouncedFetchProducts = debounce(fetchProducts, 150)

export default {
  components: {
    'product': Product
  },
  data() {
    return {
      products: [],
      partnersProducts: []
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
    let self = this
    fetchPartnersProducts().then(products => {
      self.partnersProducts = products.map(p => {
        var arrayBuffer = p.image.content;
        var bytes = new Uint8Array(arrayBuffer);
        var blob = new Blob( [ bytes ], { type: p.image.mime } );
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL( blob );
        console.log(p);
        return {
          product: {
            id: `partner-${p.id}`,
            Name: p.name,
            price: floor(p.price, 2),
            quantity: p.quantity,
            desc: p.description,
            image: imageUrl,
            company: {},
          },
          partnerLink: "https://igdiscount.eu-gb.mybluemix.net",
          partnerName: "IGDiscount",
        }
      })
    })

    fetchPartnersProductsReda().then(products => {
      console.log(products);
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
      fetchProducts(value)
      .then(products => {
        console.log(products);
        this.products = products
      })
    }
  },
  mounted() {
    $(document).ready(function(){
      $('.parallax').parallax();
    });
  },
}
</script>
