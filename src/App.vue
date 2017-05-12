<template>
  <div id="app" class="container">
    <div class="columns">
      <div class="column">
        <div>
          <router-link class="button is-primary" to="/">Wallet</router-link>
          <router-link class="button is-info" to="/wallet-seed">Seed Wallet</router-link>
          <router-link class="button is-success" to="/import-keystore">Import Wallet</router-link>
        </div>
      </div>
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
