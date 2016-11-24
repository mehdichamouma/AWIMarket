
import Vue from 'vue/dist/vue.js'
import VueRouter from "vue-router"

import Login from "./Views/Login.vue"
import Subscribe from "./Views/Subscribe.vue"
import LoginLayout from "./Views/LoginLayout.vue"
import Home from "./Views/Home.vue"
import MainLayout from "./Views/MainLayout.vue"
import AdminLayout from "./Views/AdminLayout.vue"
import ManageCompanies from "./Views/admin/ManageCompanies.vue"
import ManageProducts from "./Views/admin/ManageProducts.vue"
import ManageUsers from "./Views/admin/ManageUsers.vue"
import ManagePayments from "./Views/admin/ManagePayments.vue"
import Cart from "./Views/Cart.vue"
import CompanyCreation from "./Views/companies/CompanyCreation.vue"
import Product from "./Views/Product.vue"
import Profile from "./Views/Profile.vue"
import Company from "./Views/Company.vue"


import store from "./store"

import {me, setToken} from "./ApiClient"

console.log(store.state);
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: LoginLayout,
      children: [
        {path: '', component: Login},
        {path: 'new', component: Subscribe},
      ]
    },
    {
      path: '/',
      meta: { secure: true },
      component: MainLayout,
      children: [
        {path: '', component: Home},
        {path: 'cart', component: Cart},
        {path: 'createCompany', component: CompanyCreation},
        {path: 'products/show/:productId', name: 'showProduct', component: Product},
        {path: 'profile/:userId', name: "profile", component: Profile},
        {path: 'companies/show/:companyId', name: "showCompany", component: Company},
        {
          path: '/admin',
          component: AdminLayout,
          children: [
            {path: 'users', component: ManageUsers},
            {path: 'companies', component: ManageCompanies},
            {path: 'products', component: ManageProducts},
            {path: 'payments', component: ManagePayments},
          ]
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  let connected = false
  console.log(to.meta.secure);
  let secure = to.matched.some(record => record.meta.secure)
  if(secure) {
    console.log(store.state.user);
    if(store.state.user) {
      next()
    }
    else {
      console.log(store.getUserToken());
      if(store.getUserToken()) {
        console.log("...");
        me().then((user) => {
          if(user.user) {
            store.setUserAction(user)
            next()
          }
          else {
            next('/login')
          }
        })
        .catch(e => {
          console.error(e);
          next('/login')
        })
      }
      else {
        next('/login')
      }
    }


  }
  else {
    next()
  }
})

export default router
