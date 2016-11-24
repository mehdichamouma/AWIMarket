<template>
  <table>
    <thead>
      <tr>
          <th data-field="actions">Image</th>
          <th data-field="name">Company</th>
          <th data-field="seller">Owner</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in rows">
        <td>
          <div class="crop">
            <img :src="row.company.image" alt="" />
          </div>
        </td>
        <td>
          <router-link :to="{name:'showCompany', params: {companyId: row.company.id}}">
            {{row.company.nameSc}}
          </router-link>
          <br>SIRET <em>{{row.company.siret}}</em>
        </td>
        <td>
          <router-link :to="{name: 'profile', params: {userId: row.owner.id}}">
            {{row.owner.name}}
          </router-link>
        </td>
        <td>
          <a class=""><i class="material-icons left">delete</i></a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {fetchCompanies} from "../../ApiClient"

export default {
  data() {
    return {
      rows: []
    }
  },
  beforeCreate() {
    fetchCompanies()
    .then(res => res.json())
    .then(results => {
      this.rows = results
    })
  }
}
</script>

<style lang="css">
</style>
