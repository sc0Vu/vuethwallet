import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/views/Wallet'
import WalletSeed from '@/views/WalletSeed'
import ImportKeystore from '@/views/ImportKeystore'
import ContractTransaction from '@/views/ContractTransaction'
import ValueTransaction from '@/views/ValueTransaction'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'wallet',
      component: Wallet,
      meta: {
        title: 'Wallet'
      }
    }, {
      path: '/wallet-seed',
      name: 'wallet-seed',
      component: WalletSeed,
      meta: {
        title: 'Wallet - Seed'
      }
    }, {
      path: '/import-keystore',
      name: 'importkeystore',
      component: ImportKeystore,
      meta: {
        title: 'Import Wallet'
      }
    }, {
      path: '/contract-transaction',
      name: 'contractTransaction',
      component: ContractTransaction,
      meta: {
        title: 'Contract Transaction'
      }
    }, {
      path: '/value-transaction',
      name: 'valueTransaction',
      component: ValueTransaction,
      meta: {
        title: 'Value Transaction'
      }
    }
  ]
})
