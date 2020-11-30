// initial state
const state = {
  notifications: [],
  loading: true,
  autoRemove: true,
  timeout: 2000
}

// getters
const getters = {
  hasNotifications ({ notifications }) {
    return notifications.length > 0
  }
}

// actions
const actions = {
  notify ({ commit }, notification) {
    commit('notify', notification)
  },
  removeNotification ({ commit }, index) {
    commit('removeNotification', index)
  },
  setLoading ({ commit }, loading) {
    commit('setLoading', loading)
  },
  setAutoRemove ({ commit }, autoRemove) {
    commit('setAutoRemove', autoRemove)
  },
  setTimeout ({ commit }, timeout) {
    commit('setTimeout', timeout)
  }
}

// mutations
const mutations = {
  notify ({ notifications, autoRemove, timeout }, notification) {
    notifications.push(notification)
    if (autoRemove) {
      window.setTimeout(() => {
        notifications.splice(0, 1)
      }, timeout)
    }
  },
  removeNotification ({ notifications }, index) {
    notifications.splice(index, 1)
  },
  setLoading ({ loading }, isLoading) {
    state.loading = isLoading
  },
  setAutoRemove ({ autoRemove }, isAutoRemove) {
    state.autoRemove = isAutoRemove
  },
  setTimeout ({ timeout }, newTimeout) {
    state.timeout = newTimeout
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
