<style scope>
.navbar-start > .navbar-item.active {
  background-color: #eee
}
</style>

<template>
<div id="app">
  <div class="container">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">Vuethwallet</router-link>

        <div class="navbar-burger burger" v-on:click.prevent="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" v-bind:class="{'is-active': isMenuActive}">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/wallet-seed">Seed Wallet</router-link>
          <router-link class="navbar-item" to="/import-keystore">Import Wallet</router-link>
          <router-link class="navbar-item" to="/contract-transaction">Contract Transaction</router-link>
          <router-link class="navbar-item" to="/value-transaction">Value Transaction</router-link>
        </div>
      </div>
    </nav>
    <section class="hero is-primary">
      <div class="hero-body">
        <div>
          <p class="title">Vuethwallet - vue + ethereum wallet</p>
          <p>Due to the same random seeds will create the same wallet address.</p>
          <p>Remember to keep random seed save.</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div>
        <transition appear>
          <router-view></router-view>
        </transition>
      </div>
    </section>
  </div>
  <footer class="footer">
    <div class="container">
      <p>Made with <span class="bd-emoji">❤️</span> by <strong><a href="https://blog.ptrgl.com/" target="_blank">Petar Lai</a></strong></p>
      <p>Css framework: <strong><a href="http://bulma.io/" target="_blank">bulma</a></strong></p>
      <p>Js framework: <strong><a href="https://vuejs.org/" target="_blank">vue</a></strong></p>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isMenuActive: false
    }
  },
  methods: {
    toggleMenu () {
      if (this.isMenuActive) {
        this.isMenuActive = false
      } else {
        this.isMenuActive = true
      }
    }
  }
}
</script>
