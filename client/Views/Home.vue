<template>
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="card-panel hoverable">
        <h3>Welcome to AWI MARKET !!!!!</h3>
        <nav>
          <div class="nav-wrapper">
            <form>
              <div class="input-field">
                <input id="search" type="search" required placeholder="Browse products">
                <label for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
        <div class="row">
          <div class="col s12 m6 l4">
            <product/>
          </div>
          <div class="col s12 m6 l4">
            <product/>
          </div>
          <div class="col s12 m6 l4">
            <product/>
          </div>
          <div class="col s12 m6 l4">
            <product/>
          </div>
          <div class="col s12 m6 l4">
            <product/>
          </div>
          <div class="col s12 m6 l4">
            <product/>
          </div>
          <div class="col s12 m6 l4">
            <product/>
          </div>
          <div class="col s12 m6 l4">
            <product/>
          </div>
          <div class="col s12 m6 l4">
            <product/>
          </div>
        </div>
      </div>
    </div>
  <div>
</template>

<script>

import Product from "../Components/Product.vue"

export default {
  components: {
    'product': Product
  }
}
</script>
