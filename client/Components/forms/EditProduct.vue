 <template lang="html">
  <div class="row">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="productName" type="text" class="active validate" :value="product.productTitle" v-on:input="updateForm('productTitle', $event.target.value)">
          <label class="active" for="productName">Product Name</label>
        </div>
      </div>
      <div class="row">
        <image-upload />
      </div>
      <div class="row">
        <div class="card-panel z-depth-0 grey lighten-4">
          <div class="row">
            <p class="range-field col s12">
              <input type="range" id="test5" min="0" max="100" :value="product.price" v-on:input="updateForm('price', $event.target.value)"/>
              <label class="active" for="quantityLeft">Price</label>
            </p>
          </div>
          <div class="row">
            <p class="range-field col s12">
              <input type="range" id="test5" min="0" max="100" :value="product.quantityLeft" v-on:input="updateForm('quantityLeft', $event.target.value)"/>
              <label class="active" for="quantityLeft">Quantity Left</label>
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea" v-on:input="updateForm('productDescription', $event.target.value)">{{product.productDescription}}</textarea>
              <label class="active" for="textarea1">Product description</label>
            </div>
          </div>
        </div>
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
  props: ["product"],
  methods: {
    updateForm(field, value) {
        this.$emit('valueChange', field, value)
    }
  },
}
</script>

<style lang="css">
</style>
