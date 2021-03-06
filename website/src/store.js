import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    events: [ ],
    loading: true,
    error: null
  },
  mutations: {
    eventsLoaded (state, { events }) {
      state.events = events
      state.loading = false
    },
    eventsFailedToLoad (state, { error }) {
      state.error = error
      state.loading = false
    }
  },
  actions: {
    async load ({ commit }) {
      try {
        var base = /deploy-preview.*netlify/.test(window.location.host)
          ? ''
          : 'https://thaiprogrammer-tech-events-calendar.spacet.me'
        const events = await window.fetch(base + '/calendar.json')
          .then((response) => response.json())
        commit('eventsLoaded', { events })
      } catch (error) {
        commit('eventsFailedToLoad', { error })
      }
    }
  }
})

export default store
