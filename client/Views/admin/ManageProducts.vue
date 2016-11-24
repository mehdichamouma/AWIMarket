<template>
  <table>
    <thead>
      <tr>

          <th data-field="image">Image</th>
          <th data-field="name">Name</th>
          <th data-field="seller">Seller</th>
          <th data-field="price">Item Price</th>
          <th data-field="quantityLeft">Quantity</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in rows">
        <td>
          <div class="crop">
            <img :src="row.product.image" alt="" />
          </div>
        </td>
        <td>
            <router-link :to="{name:'showProduct', params: {productId: row.product.id}}">
              {{row.product.Name}}
            </router-link>
        </td>
        <td>
          <router-link to="">
            {{row.seller.nameSc}}
          </router-link>
        </td>
        <td>${{row.product.price}}</td>
        <td>{{row.product.quantity}}</td>
        <td><a class=""><i class="material-icons left">delete</i></a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {fetchProducts} from "../../ApiClient"

export default {
  data() {
    return {
      rows: []
    }
  },
  beforeCreate() {
    fetchProducts()
    .then(results => {
      this.rows = results
    })
  }
}
</script>

<style lang="css">
</style>
