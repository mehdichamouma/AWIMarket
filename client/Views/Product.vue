<template lang="html">
    <div class="row">
      <div class="card card-panel z-depth-0 grey lighten-5">
        <div class="card-content">
            <div class="row">
              <div class="row">
                <div class="col s12">
                  <h3>{{productTitle}}</h3>
                </div>
              </div>
              <div class="col s12 m6">
                  <img class="materialboxed productImage" v-bind:src="imageUrl">
              </div>
              <div class="col s12 m6">

                <div class="row">
                  <div class="col s12">
                    <div class="card-panel grey lighten-3 z-depth-0">
                      <p>{{productDescription}}</p>
                    </div>
                  </div>
                  <div class="col s12">
                    <div class="card card-panel">
                      <div class="card-content">
                        <div class="row">
                          <p class="range-field col s12">
                            <input type="range" id="quantity" min="1" v-bind:max="quantityLeft" v-model="quantity"/>
                            <label for="quantity">Quantity</label>
                          </p>
                        </div>
                        <div class="row">
                          <p class="range-field col s12">
                            {{quantityLeft}} products left
                          </p>
                        </div>
                      </div>
                      <div class="card-action">
                        <div class="row">
                          <div class="col s12">
                            <p class="center-align">
                              <span>Total: {{totalPrice}} $</span>
                            </p>
                          </div>
                          <div class="col s12">
                            <div class="center-align">
                              <a class="waves-effect waves-light btn" v-on:click="handleCartClick">Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                </div>
              </div>
            </div>
          </div>


      </div>
      <div class="card-action">
          <a class="waves-effect waves-teal btn-flat activator">Edit the product</a>
      </div>
      <div class="card-reveal">
        <div class="card-panel z-depth-3 white">
          <div class="row">
            <span class="card-title grey-text text-darken-4">Edit the product<i class="material-icons right">close</i></span>
          </div>
          <edit-product-form
            v-bind:productTitle="productTitle"
            v-bind:quantityLeft="quantityLeft"
            v-bind:productDescription="productDescription"
            v-bind:price="price"
          />
          <div class="row">
            <div class="col s12">
              <div class="right-align">
                <a class="waves-effect waves-light btn">Update</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchProduct} from "../ApiClient"
import ImageUpload from "../Components/ImageUpload.vue"
import EditProduct from "../Components/forms/EditProduct.vue"

export default {
  components: {
    "edit-product-form": EditProduct
  },
  data() {
    return {
      productTitle: null,
      quantityLeft: null,
      productDescription: null,
      price: null,
      imageUrl: null,
      quantity: 1
    }
  },
  beforeCreate() {
    let {productId} = this.$route.params
    fetchProduct(productId)
    .then(res => res.json())
    .then((data) => {
      this.productTitle = data.product.Name
      this.quantityLeft = data.product.quantity
      this.productDescription = data.product.desc
      this.price = data.product.price
      this.imageUrl = data.product.image
    })
  },
  computed: {
    totalPrice() {
      return this.quantity * this.price
    }
  },
  methods: {
    handleCartClick() {
      let productId = this.$route.params.productId
      let product = {
        id: productId,
        desc: this.productDescription,
        Name: this.productTitle,
        image: this.imageUrl,
        quantity: this.quantityLeft,
        price: this.price
      }
      if(product) {
        this.$root.store.cartAddProduct(product, this.quantity)
      }
    }
  }
}
</script>

<style lang="css">

.productImage {
  width: 100%
}
</style>
