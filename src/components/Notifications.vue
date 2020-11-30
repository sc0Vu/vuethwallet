<style scoped>
.notifications {
  max-width: 400px;
  min-width: 240px;
  width: 40%;
  position: fixed;
  left: 5px;
  bottom: 5px;
}

.notification {
  width: 100%;
  margin-bottom: 5px;
}
</style>

<template>
<div class="notifications" v-show="hasNotifications">
	<div class="notification" v-for="(notification, index) in notifications" v-bind:key="index" v-bind:class="notification.class">
	  <button class="delete" v-on:click="removeNotification(index)"></button>
	  {{ notification.text }}
	</div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'notifications',
  computed: {
    ...mapState({
      notifications (state) {
        return state.page.notifications
      }
    }),
    ...mapGetters([
      'hasNotifications'
    ])
  },
  methods: {
    ...mapActions([
      'removeNotification'
    ])
  }
}
</script>
