<template>
  <div class="login-layout">
      <div class="row">
          <div class="col s6">
            <img src="img/logo.png" alt="" class="logo"/>
          </div>
          <div class="col s6">
              <router-view class="view"></router-view>
          </div>
      </div>
  </div>
</template>


<style>

.login-layout {
  background: url("/img/classic-living-room-style.jpg");
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
}
.col.s6{
  margin-top: 20px;
}
</style>
