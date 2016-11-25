<template lang="html">
    <div class="row">
      <div class="card card-panel z-depth-0 grey lighten-5">
        <div class="card-content">
            <div class="row">
              <div class="row">
                <div class="col s12">
                  <h3>{{product.productTitle}}</h3>
                </div>
              </div>
              <div class="col s12 m6">
                  <img class="materialboxed productImage" v-bind:src="product.imageUrl">
              </div>
              <div class="col s12 m6">

                <div class="row">
                  <div class="col s12">
                    <div class="card-panel grey lighten-3 z-depth-0">
                      <p>{{product.productDescription}}</p>
                      <h3>{{product.price}} $</h3>
                    </div>
                  </div>
                  <div class="col s12">
                    <div class="card card-panel" v-if="isOwner">
                      You can't buy your product.
                    </div>
                    <div class="card card-panel" v-else>
                      <div class="card-content">
                        <div class="row">
                          <p class="range-field col s12">
                            <input type="range" id="quantity" min="1" v-bind:max="product.quantityLeft" v-model="quantity" v-bind:disabled="inCart"/>
                            <label for="quantity">Quantity</label>
                          </p>
                        </div>
                        <div class="row">
                          <p class="range-field col s12">
                            {{product.quantityLeft}} products left
                          </p>
                        </div>
                      </div>
                      <div class="card-action">
                        <div class="row">
                          <div class="col s12" v-if="!inCart">
                            <p class="center-align">
                              <span>Total: {{totalPrice}} $</span>
                            </p>
                          </div>
                          <div class="col s12 center-align">
                              <a class="waves-effect waves-light btn" v-on:click="handleCartClick" v-if="!inCart">Add to cart</a>
                              <router-link class="waves-effect waves-light btn-flat" to="/cart" v-else>Got to my cart</router-link>
                          </div>
                          <div class="col s12 center-align" v-if="inCart">
                              The product is already in your cart
                          </div>
                        </div>
                      </div>

                    </div>
                </div>
              </div>
            </div>
          </div>


      </div>
      <div class="card-action" v-if="canEdit">
          <a class="waves-effect waves-teal btn-flat activator">Edit the product</a>
          <a v-if="canUpdate" class="waves-effect waves-teal btn-flat">Save changes</a>
      </div>
      <div class="card-reveal" v-if="canEdit">
        <div class="card-panel z-depth-3 white">
          <div class="row">
            <span class="card-title grey-text text-darken-4">Edit the product<i class="material-icons right">close</i></span>
          </div>
          <edit-product-form
            v-bind:product="product"
            v-on:valueChange="handleFormChange"
          />
        </div>
      </div>
    </div>
    <div class="row red lighten-4">
        <div class="col s12">
          <h3 class="white-text">Related Products</h3>
        </div>
        <div v-for="product in relatedProducts" class="col s12 m6 l4">
          <product
            v-bind:id="product.id"
            v-bind:title="product.Name"
            v-bind:price="product.price"
            v-bind:description="product.desc"
            v-bind:quantityLeft="product.quantity"
            v-bind:productImage="product.image"
            v-bind:company="{id: null}"
            type="Awimarket"
          />
        </div>
    </div>
  </div>
</template>

<script>
import {fetchProduct, fetchRelatedProducts} from "../ApiClient"
import ImageUpload from "../Components/ImageUpload.vue"
import EditProduct from "../Components/forms/EditProduct.vue"
import Product from "../Components/Product.vue"

export default {
  components: {
    "edit-product-form": EditProduct,
    "product": Product
  },
  data() {
    return {
      product: {
        id: null,
        productTitle: null,
        quantityLeft: null,
        productDescription: null,
        price: null,
        imageUrl: null,
      },
      quantity: 1,
      canUpdate: false,
      company: {
        id: null,
        name: null,
        image: null,
      },
      relatedProducts: []
    }
  },
  beforeCreate() {
    let {productId} = this.$route.params
    fetchProduct(productId)
    .then(res => res.json())
    .then((data) => {
      this.product.id = data.product.id
      this.product.productTitle = data.product.Name
      this.product.quantityLeft = data.product.quantity
      this.product.productDescription = data.product.desc
      this.product.price = data.product.price
      this.product.imageUrl = data.product.image
      this.company = {
        id: data.seller.id,
        name: data.seller.nameSc,
        image: data.seller.image
      }
    })

    fetchRelatedProducts(productId)
    .then(data => {
      this.relatedProducts = data.relatedProducts
    })
  },
  computed: {
    totalPrice() {
      return this.quantity * this.product.price
    },
    isOwner() {
      let user = this.$root.store.state.user
      return user.company && this.company.id == user.company.id
    },
    isAdmin() {
      let user = this.$root.store.state.user
      return user.user.is_admin
    },
    canEdit() {
      return this.isAdmin || this.isOwner
    },
    inCart() {
      let user = this.$root.store.state.user
      let cart = this.$root.store.state.cart
      return cart.content.some(p => p.product.id == this.product.id)
    }
  },
  methods: {
    handleCartClick() {
      let productId = this.$route.params.productId
      let product = {
        id: this.product.id,
        desc: this.product.productDescription,
        Name: this.product.productTitle,
        image: this.product.imageUrl,
        quantity: this.product.quantityLeft,
        price: this.product.price
      }
      if(product) {
        this.$root.store.cartAddProduct(product, this.quantity)
      }
    },
    handleFormChange(field, value) {
      console.log(field, value);
      this.canUpdate = true
      this.product[field] = value
    }
  }
}
</script>

<style lang="css">

.productImage {
  width: 70%
}
</style>
