
export default {
  namespaced: true,
  state () {
    return {
      chatRecords: []
    }
  },
  mutations: {
    addChatRecords (state, chatRecord) {
      state.chatRecords.push(chatRecord)
    }
  },
  actions: {},
  getters: {
    getChatRecords (state) {
      return state.chatRecords
    }
  }
}
