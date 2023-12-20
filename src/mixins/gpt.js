import { talkToGPT, getMsgMaxLength } from '@/api/gpt'
import { MY_MSG_TYPES, GPT_MSG_TYPES, ERROR_CHAT_RESP, BEI_AN } from '@/utils/constants'
import { mapMutations, mapGetters, mapState } from 'vuex'
import DialogBox from '@/components/DialogBox'

export const gptCommonMethods = {
  data () {
    return {
      isSmallScreen: false,
      inputText: '',
      maxLength: 500,
      beianTxt: BEI_AN,
      isWaitingResp: false
    }
  },
  components: {
    DialogBox
  },
  computed: {
    ...mapState('gptVuex', ['chatRecords']),
    ...mapGetters('gptVuex', ['getQuestionByAnswer']),
    count () {
      return this.inputText.length
    },
    isBlocked () {
      return this.count === 0 || this.isWaitingResp
    }
  },
  async created () {
    const res = await getMsgMaxLength()
    this.maxLength = res.data
  },
  mounted () {
    // 根据页面宽度决定按钮大小
    this.isSmallScreen = window.innerWidth < 768
    if (this.chatRecords.length === 0) {
      const firstRecord = {}
      firstRecord.chatRecord = '跟我聊聊天吧！'
      firstRecord.owner = GPT_MSG_TYPES
      this.addChatRecords(firstRecord)
    }
    this.scrollToBottom()
  },
  methods: {
    ...mapMutations('gptVuex', ['addChatRecords', 'removeLastChatRecords']),
    async commitQuestion (event = {}) {
      if (event.shiftKey) { // shift + enter 换行
        return
      }
      if (event.key === 'Enter') { // 禁止换行
        event.preventDefault()
      }
      if (this.isWaitingResp || this.inputText.trim() === '') {
        return
      }
      const myQuestion = {}
      myQuestion.chatRecord = this.inputText.replace(/\n/g, '<br/>')
      myQuestion.owner = MY_MSG_TYPES
      this.addChatRecords(myQuestion)
      const reqBody = {}
      reqBody.question = this.inputText.trim()
      this.inputText = ''
      this.scrollToBottom()
      // 加载中
      const loading = {}
      loading.owner = GPT_MSG_TYPES
      loading.isLoading = true
      this.addChatRecords(loading)
      this.scrollToBottom()
      let ans
      try {
        this.isWaitingResp = true
        ans = await talkToGPT(reqBody)
      } catch (error) {
        this.errorRespHandler(error)
        return
      } finally {
        this.isWaitingResp = false
      }
      // 得到回答
      const data = ans.data
      if (data.code !== 200) {
        this.errorRespHandler(ans)
        return
      }
      const gptAnswer = {}
      gptAnswer.owner = GPT_MSG_TYPES
      gptAnswer.chatRecord = data.data.replace(/\\n/g, '<br/>')
      this.removeLastChatRecords()
      this.addChatRecords(gptAnswer)
      this.scrollToBottom()
    },
    // 发送完消息后窗口自动滚动到底部
    scrollToBottom () {
      // 使用 "nextTick" 以确保 DOM 已更新
      this.$nextTick(() => {
        const chatViews = this.$el.querySelector('.el-main')
        chatViews.scrollTop = chatViews.scrollHeight // 滚动到底部
      })
    },
    errorRespHandler (errResp) {
      const errorResp = {}
      errorResp.owner = GPT_MSG_TYPES
      errorResp.isError = true
      errorResp.chatRecord = errResp.data ? errResp.data.msg : ERROR_CHAT_RESP
      this.removeLastChatRecords()
      this.addChatRecords(errorResp)
      this.scrollToBottom()
    },
    refreshAns (ansId) {
      const questionRecord = this.getQuestionByAnswer(ansId)
      if (questionRecord === '' || this.isWaitingResp) {
        return
      }
      this.inputText = questionRecord
      //   this.removeLastChatRecords()
      //   this.removeLastChatRecords()
      this.commitQuestion()
    }
  }
}
