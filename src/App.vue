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
    <section class="hero is-small is-primary is-bold">
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
  <Notifications />
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Notifications from '@/components/Notifications'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Notifications
  },
  mounted () {
    this.notify({ text: 'You can use this wallet to make transaction on ethereum blockchain, if you have any question, please open an issue on github!', class: 'is-info' })
  },
  methods: {
    ...mapActions([
      'notify'
    ])
  }
}
</script>
