<template>
  <div class="notification" v-bind:class="{'is-danger': error, 'is-info': !error}" v-if="message">
    <button class="delete" v-on:click="clearMessage"></button>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    message: {
      type: String,
      default () {
        return ''
      }
    },
    error: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    clearMessage () {
      // this.message = ''
      this.$emit('update:msg', '')
    }
  }
}
</script>
