<template>
  <div class="login-layout">
      <div class="row">
          <div class="col s8 offset-s3 m6">
            <img src="img/logo.png" alt="" class="logo"/>
          </div>
          <div class="col s12 m6 ">
              <router-view class="view"></router-view>
          </div>
      </div>
  </div>
</template>


<style>

.login-layout {
  background: url("/img/classic-living-room-style.jpg");
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  position: absolute;
}
</style>
