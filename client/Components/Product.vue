<template>
  <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="http://placehold.it/350x150">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">{{ title }}<i class="material-icons right">more_vert</i></span>
      <p><a v-on:click="cartClick">Add to cart</a></p>
      <p>{{ price }} $ <span class="badge">5</span></p>
      <p>

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
  props: ['title', 'price', 'description', 'quantityLeft'],
  methods: {
    cartClick() {
      this.$emit('cartClick')
    }
  }
}
</script>
