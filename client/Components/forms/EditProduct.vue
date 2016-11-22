<template lang="html">
  <div class="row">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="productName" type="text" class="active validate" v-model="productTitle">
          <label for="productName">Product Name</label>
        </div>
      </div>
      <div class="row">
        <image-upload />
      </div>
      <div class="row">
        <div class="card-panel z-depth-0 grey lighten-4">
          <div class="row">
            <p class="range-field col s12">
              <input type="range" id="test5" min="0" max="100" v-model="price"/>
              <label for="quantityLeft">Price</label>
            </p>
          </div>
          <div class="row">
            <p class="range-field col s12">
              <input type="range" id="test5" min="0" max="100" v-model="quantityLeft"/>
              <label for="quantityLeft">Quantity Left</label>
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea">{{productDescription}}</textarea>
              <label for="textarea1">Product description</label>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import ImageUpload from "../ImageUpload.vue"

export default {
  components: {
    "image-upload": ImageUpload,
  },
  props: ["productTitle", "price", "quantityLeft", "productDescription"]
}
</script>

<style lang="css">
</style>
