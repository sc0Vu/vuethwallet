<style scoped>
p {
  word-break: break-word;
}
</style>

<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <p>{{ labelText }}</p>
    </div>

    <div class="column is-half">
      <p v-if="type === 'text'">{{ secretText }}</p>
      <p v-if="type === 'password'">{{ asteriskText }}</p>
    </div>

    <div class="column is-one-quarter">
      <button class="button password-button" v-bind:class="type === 'password' ? 'is-warning' : 'is-info'" v-on:click.prevent.self="switchType">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'secret-text',
  data () {
    return {
      type: 'password'
    }
  },
  props: {
    labelText: {
      type: String,
      default () {
        return ''
      }
    },
    secretText: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    asteriskText () {
      // return ''.padStart(this.secretText.length, '*')
      return '******************************************'
    },
    buttonText () {
      return (this.type === 'text') ? 'Hide' : 'Show'
    }
  },
  methods: {
    switchType () {
      if (this.type === 'text') {
        this.type = 'password'
      } else {
        this.type = 'text'
      }
    }
  }
}
</script>
