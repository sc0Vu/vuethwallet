<style scope>
.navbar-start > .navbar-item.active {
  background-color: #eee
}
.section .panel {
  overflow: hidden;
}
</style>

<template>
<div id="app">
  <div class="container">
    <Header />
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div>
          <p class="title">Vuethwallet - vue + ethereum wallet</p>
          <p class="subtitle">Due to the same random seeds will create the same wallet address.<br />Remember to keep random seed save.</p>
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
  <Footer />
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
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
