<template>
  <div id="app" class="container">
    <div class="button-group">
      <router-link to="/">錢包</router-link>
      <router-link to="/wallet-seed">種子錢包</router-link>
      <router-link to="/import-keystore">匯入錢包</router-link>
    </div>
    <transition appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
