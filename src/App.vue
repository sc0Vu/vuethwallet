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
    <NavBar />
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
  <Bottom />
  <Notifications />
</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Bottom from '@/components/Bottom'
import Notifications from '@/components/Notifications'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    NavBar,
    Bottom,
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
