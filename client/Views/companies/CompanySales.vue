<template>
  <table>
    <thead>
      <tr>
          <th data-field="seller">Ordered By</th>
          <th data-field="name">Product</th>
          <th data-field="price">Item Price</th>
          <th data-field="quantityLeft">Quantity</th>
          <th data-field="sent">Sent</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(sale, index) in sales">
        <td>
            <router-link :to="{name:'showProduct', params: {productId: sale.product.id}}">
              {{sale.product.Name}}
            </router-link>
        </td>
        <td>
          <router-link to="">
            {{sale.buyer.name}}
          </router-link>
        </td>
        <td>${{sale.price}}</td>
        <td>{{sale.quantity}}</td>
        <td>
          <p>
            <input v-bind:checked="sale.sent" type="checkbox" :id="`test5-${index}`" v-on:change="sendProduct(index)"/>
            <label :for="`test5-${index}`" v-if="sale.sent">Sent</label>
            <label :for="`test5-${index}`" v-else>Not Sent</label>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {fetchCompanySales, updateOrderProductStatus} from "../../ApiClient"

export default {
  data() {
    return {
      sales: []
    }
  },
  beforeCreate() {
    fetchCompanySales(this.$route.params.companyId)
    .then(data => {
      console.log(data);
      this.sales = data.map(s => Object.assign({}, s, {
        sent: false
      }))
    })
  },
  methods: {
    sendProduct(index) {
      console.log(this.sales[index]);
      let sale = this.sales[index]
      updateOrderProductStatus(sale.order.id, sale.product.id)
      .then(() => {
        this.sales[index].sent = true
      })

    }
  }
}
</script>

<style lang="css">
</style>
