<template>
    <div class="row">
      <div class="col s12 l4">
          <h3>Control Panel</h3>
          <div class="collection">
            <router-link active-class="active" to="/admin/products" class="collection-item">Manage products</router-link>
            <router-link active-class="active" to="/admin/users" class="collection-item">Manage Users</router-link>
            <router-link active-class="active" to="/admin/companies" class="collection-item">Manage Companies</router-link>
            <router-link active-class="active" to="/admin/payments" class="collection-item">Moderate Payments</router-link>
          </div>
      </div>
      <div class="col s12 l8">
        <div class="card-panel z-depth-0">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
