<template>
  <div class="card product">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" v-bind:src="productImage">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">{{ title }}<i class="material-icons right">more_vert</i></span>

      <p>
        <h4>{{ price }} $ </h4>
      </p>
      <p>
        <router-link class="waves-effect waves-light btn amber accent-2" :to="{ name: 'showProduct', params: {productId: id}}">
          show
          <i class="material-icons right">arrow_forward</i>
        </router-link><br>
        <span class="grey-text text-lighten-2">{{quantityLeft}} products left</span>

      </p>

    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{{ title }}<i class="material-icons right">close</i></span>
      <p>{{ description}}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: ['id', 'title', 'price', 'description', 'quantityLeft', 'productImage'],
  methods: {
    cartClick() {
      this.$emit('cartClick')
    },
  }
}
</script>

<style>
  .product .card-image {
    height: 150px;
  }
</style>
