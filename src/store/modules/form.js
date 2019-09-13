import vueDataJson from '../../../data.json'
export default {
  state: {
    data: {}
  },
  mutations: {
    updateStore (state, data) {
      state.data = data
    }
  },
  actions: {
    fetchJson (ctx) {
      // const json = vueDataJson

      ctx.commit('updateStore', vueDataJson)
    }
  },
  getters: {
    getData (state) {
      return state.data
    }
  }
}
