// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from './router'

Vue.config.productionTip = false

// rewrite document title
const APP_NAME = '*** Vue Ethwallet ***'

router.afterEach(function (to, from) {
  var title = to.meta.title || 'Wallet'

  title += ' | ' + APP_NAME
  document.title = title
})

/* eslint-disable no-new */
new Vue({
  el: '#vuethwallet',
  store,
  router,
  template: '<App/>',
  components: { App }
})
