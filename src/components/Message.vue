<template>
  <div class="notification" v-bind:class="{'is-danger': error, 'is-info': !error}" v-if="message">
    <button class="delete" v-on:click="clearMessage"></button>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'message',
  props: ['message', 'error'],
  methods: {
    clearMessage () {
      // this.message = ''
      this.$emit('update:msg', '')
    }
  }
}
</script>
