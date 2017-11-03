<template>
<div class="columns">
  <div class="column is-one-quarter">
    <label class="label" for="pass">Password (No space)</label>
  </div>

  <div class="column is-half">
    <div class="control">
      <input id="pass" class="input" type="text" v-model="password" placeholder="Password (No space)" v-on:change.prevent.self="checkPassword" v-if="type === 'text'" v-bind:class="{'is-danger': ((!isPasswordValid && !emptyPassword) || error), 'is-success': (isPasswordValid)}">
      <input id="pass" class="input" type="password" v-model="password" placeholder="Password" v-on:change.prevent.self="checkPassword" v-if="type === 'password'" v-bind:class="{'is-danger': ((!isPasswordValid && !emptyPassword) || error), 'is-success': (isPasswordValid)}">
      <p class="help is-success password-help" v-if="isPasswordValid">
        <span class="password-help-msg">Strong Password</span>
      </p>
      <p class="help is-danger password-help" v-else-if="!emptyPassword">
      	<span class="password-help-msg">Weak Password</span><br>
      	<span class="password-help-suggestions" v-if="feedback.suggestions">Suggestions: {{ feedback.suggestions.join(',') }}</span><br>
      	<span class="password-help-warning" v-if="feedback.warning">Warning: {{ feedback.warning }}</span>
      </p>
    </div>
  </div>

  <div class="column is-one-quarter">
    <button class="button is-info password-button" v-on:click.prevent.self="switchType">{{ buttonText }}</button>
  </div>
</div>
</template>

<script>
import zxcvbn from 'zxcvbn'

export default {
  name: 'password-input',
  data () {
    return {
      password: '',
      score: 0,
      type: 'text',
      buttonText: 'Hide',
      error: false,
      feedback: {}
    }
  },
  computed: {
    isPasswordValid () {
      return this.score >= 3 && !/^(?:[\s]+)$/.test(this.password)
    },
    emptyPassword () {
      return this.password === '' || this.password === null || this.password === undefined
    }
  },
  methods: {
    switchType () {
      if (this.type === 'text') {
        this.type = 'password'
        this.buttonText = 'Show'
      } else {
        this.type = 'text'
        this.buttonText = 'Hide'
      }
    },
    checkPassword () {
      var result = zxcvbn(this.password)
      var score = result.score

      this.score = score
      this.feedback = result.feedback

      if (score < 3) {
        this.$emit('failed', result)
      } else {
        this.$emit('success', result)
      }
    }
  }
}
</script>
