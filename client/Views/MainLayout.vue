<template>
  <div>
    <div class="navbar-fixed indigo">
      <nav>
        <div class="nav-wrapper grey lighten-3">
          <a href="#!" class="brand-logo deep-orange-text left"><img src="img/logo.png" class="menu-logo"/></a>
          <ul class="right">
            <li><a class="deep-orange-text" href="sass.html">Sass</a></li>
            <li><a class="deep-orange-text" href="badges.html">Components</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>

.menu-logo {
    height: 30px;
    //width: 100px;
    color: "abc"
}

</style>
