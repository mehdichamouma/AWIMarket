<template lang="html">
  <div>
    <div class="row">
      <div class="col s12 m7 l8">
        <h3>Cart content</h3>
        <div class="row">
          <div v-for="(item, index) in $root.store.state.cart.content" class="col s12 l6">
            <div class="card-panel grey lighten-5">
              <div class="row">
                <div class="card-panel z-depth-0 teal white-text text-darken-4">
                  <h5>{{ item.product.Name }}</h5>
                  <p class="grey-text text-lighten-2">{{ item.product.desc }}</p>
                </div>
              </div>

                <div class="card-panel z-depth-0 teal grey lighten-5">
                  <div class="row">
                    <div class="col s6">
                        <strong>Quantity:</strong> {{ item.quantity}}
                    </div>
                    <div class="col s6">
                        <strong>Unit Price:</strong> {{ item.product.price }}$
                    </div>
                    <div class="col s12">
                      <strong>Total:</strong> {{ item.quantity * item.product.price }}$
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="right-align">
                      <a v-on:click="removeItem(index)" class="waves-effect waves-teal btn-flat">
                          <i class="material-icons left">close</i>
                          Remove
                      </a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m5 l4">
        <h3>Validation</h3>
        <div class="row">
          <div class="row">
            <div class="col s8">
              <strong>Total items</strong>
            </div>
            <div class="col s4">
              {{totalItems}}
            </div>
          </div>
          <div class="divider"></div>
          <div class="row">
            <div class="col s8">
              <strong>Total Price (tax free)</strong>
            </div>
            <div class="col s4">
              {{totalPriceFreeTax}} $
            </div>
          </div>
          <div class="divider"></div>
          <div class="row">
            <div class="col s8">
              <strong>Tax (20%)</strong>
            </div>
            <div class="col s4">
              {{totalTax}} $
            </div>
          </div>
          <div class="divider"></div>
          <div class="row">
            <div class="col s8">
              <strong>Total price</strong>
            </div>
            <div class="col s4">
              {{totalPrice}} $
            </div>
          </div>
        </div>

        <div class="row">
          <div class="right-align">
            <a class="waves-effect waves-light btn">Continue</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  methods: {
    removeItem(index) {
      this.$root.store.cartRemoveProduct(index)
    }
  },
  computed: {
    totalPriceFreeTax() {
      return this.$root.store.state.cart.content.reduce((total, item) => total + item.quantity * item.product.price, 0)
    },
    totalItems() {
      return this.$root.store.state.cart.content.length
    },
    totalTax() {
      return 0.2 * this.totalPriceFreeTax
    },
    totalPrice() {
      return 1.2 * this.totalPriceFreeTax
    }
  }
}
</script>

<style lang="css">
</style>
