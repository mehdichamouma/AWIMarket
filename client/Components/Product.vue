<template>
  <div class="card product">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" v-bind:src="productImage">
    </div>
    <div class="card-content">
      <div class="row">
        <div class="col s12">
          <span class="card-title activator grey-text text-darken-4">

            {{ title }}
            <i class="material-icons right">more_vert</i>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <h4>{{ price }} $ </h4>
        </div>
        <div class="col s12">
          <span class="grey-text text-lighten-2">{{quantityLeft}} products left</span>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <router-link class="waves-effect waves-light btn amber accent-2" :to="{ name: 'showProduct', params: {productId: id}}" v-if="type == 'Awimarket'">
            show
            <i class="material-icons right">arrow_forward</i>
          </router-link>
          <a v-else :href="partnerLink" target="_blank">{{partnerName}}</a>
          <br>
        </div>
        <div class="col s6 right-align">
            <div class="chip" v-if="isOwner">
              My product
            </div>
        </div>
      </div>

    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{{ title }}<i class="material-icons right">close</i></span>
      <p>{{ description}}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: ['id', 'title', 'price', 'description', 'quantityLeft', 'productImage', 'company', 'type', 'partnerLink', 'partnerName'],
  methods: {
    cartClick() {
      this.$emit('cartClick')
    },
  },
  computed: {
    isOwner() {
      let user = this.$root.store.state.user
      return user.company && this.company.id == user.company.id
    }
  }
}
</script>

<style>
  .product .card-image {
    height: 170px;
  }
  .product .card-image img {
    width: auto;
    max-width: 170px;
    margin-left: auto;
    margin-right: auto;
    top: 20px;
  }
</style>
