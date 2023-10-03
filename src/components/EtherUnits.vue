<template>
<div class="columns">
  <div class="column is-one-quarter">
    <label class="label" v-bind:for="valueLabel">{{ valueLabel }}</label>
  </div>

  <div class="column is-half">
    <div class="control">
      <input v-bind:id="valueLabel" class="input" type="text" v-model="value" v-bind:placeholder="valuePlaceholder" v-bind:class="{'is-success': value}" v-on:blur.prevent.self="validateValue">
    </div>
  </div>

  <div class="column is-one-quarter">
    <div class="select">
      <select v-model="unit">
        <option v-bind:value="u" v-for="(i, u) in units">{{ u }}</option>
      </select>
    </div>
  </div>
</div>
</template>

<script>
import { BigNumber } from 'bignumber.js'

export default {
  name: 'ether-units',
  data () {
    return {
      password: '',
      score: 0,
      type: 'text',
      buttonText: 'Hide',
      error: false,
      feedback: {},
      value: 0,
      unit: 'wei',
      units: {
        wei: new BigNumber(1),
        kwei: new BigNumber(1000),
        mwei: new BigNumber(1000000),
        gwei: new BigNumber(1000000000),
        szabo: new BigNumber(1000000000000),
        finny: new BigNumber(1000000000000000),
        ether: new BigNumber(1000000000000000000)
      }
    }
  },
  props: {
    valueLabel: '',
    valuePlaceholder: ''
  },
  methods: {
    validateValue () {
      if (this.unit === '') {
        this.$emit('failed', new Error('please choose unit'))
        return false
      }
      if (this.units[this.unit] === undefined) {
        this.$emit('failed', new Error('unit not found'))
        return false
      }
      let val = {
        value: new BigNumber(this.value),
        unitName: this.unit,
        unit: this.units[this.unit]
      }
      this.$emit('success', val)
      return true
    }
  },
  watch: {
    unit (val) {
      this.validateValue()
    }
  }
}
</script>
