<template>
  <div>
    <div class="row">
      <div class="col s12 l3">
        <div class="hoverable">
          <div class="collection">
            <router-link to="/admin/products" class="collection-item">Manage products</router-link>
            <router-link to="/admin/users" class="collection-item active">Manage Users</router-link>
            <router-link to="/admin/companies" class="collection-item">Manage Companies</router-link>
            <router-link to="/admin/payments" class="collection-item">Moderate Payments</router-link>
          </div>
        </div>
      </div>
      <div class="col s12 l9">
        <div class="card-panel hoverable">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
