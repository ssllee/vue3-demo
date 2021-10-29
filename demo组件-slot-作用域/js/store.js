const store = Vuex.createStore({
  state () {
    return {
      labelArray: []
    }
  },
  mutations: {
    addLabel (state, payload) {
      if(!state.labelArray.includes(payload.label)) {
        state.labelArray.push(payload.label)
      }
    }
  }
})

export { store }