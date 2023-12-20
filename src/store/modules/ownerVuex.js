
export default {
  namespaced: true,
  state () {
    return {
      myBlogs: [],
      openSource: []
    }
  },
  mutations: {
    setMyBlogs (state, payload) {
      state.myBlogs = payload
    },
    setOpenSource (state, payload) {
      state.openSource = payload
    }
  }
}
