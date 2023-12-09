<template>
  <div class="app">
    <div class="container">
      <el-main ref="test">
        <div v-for="item in chatRecords" :key="item.chatRecord">
          <DialogBox :chatBox="item" :isSmallScreen="isSmallScreen"></DialogBox>
        </div>
      </el-main>
      <div class="footerDiv">
        <textarea
          placeholder="输入看看"
          class="textareaSty"
          :maxlength="maxLength"
          rows="3"
          v-model="inputText"
          @keyup.enter="commitQuestion"
        ></textarea>
        <div class="btnBox">
          {{ count }}/{{ maxLength }}
          <el-button
            type="primary"
            icon="el-icon-thumb"
            :size="isSmallScreen ? 'small' : 'medium'"
            :disabled="count == 0"
            @click="commitQuestion"
            circle
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogBox from '@/components/DialogBox'
import { getMsgMaxLength, talkToGPT } from '@/api/gpt'
import { mapMutations, mapState } from 'vuex'
import { MY_MSG_TYPES, GPT_MSG_TYPES } from '@/utils/constants'
export default {
  name: 'Gpt',
  data () {
    return {
      isSmallScreen: false,
      inputText: '',
      maxLength: 500
    }
  },
  components: {
    DialogBox
  },
  computed: {
    ...mapState('gptVuex', ['chatRecords']),
    count () {
      return this.inputText.length
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
    ...mapMutations('gptVuex', ['addChatRecords']),
    updateCount () {
      // this.count = this.inputText.length
    },
    async commitQuestion (event) {
      if (event.shiftKey) {
        // 识别shift + enter按键，阻止默认的enter行为
        event.preventDefault()
        return
      }
      const myQuestion = {}
      myQuestion.chatRecord = this.inputText.replaceAll('\n', '<br/>')
      myQuestion.owner = MY_MSG_TYPES
      this.addChatRecords(myQuestion)

      const reqBody = {}
      reqBody.question = this.inputText.trim()
      this.inputText = ''
      this.updateCount()
      this.scrollToBottom()
      const ans = await talkToGPT(reqBody)

      const data = ans.data
      if (data.code !== 200) {
        this.$message({
          message: data.msg,
          type: data.code < 500 ? 'warning' : 'error',
          showClose: true
        })
        return
      }
      const gptAnswer = {}
      gptAnswer.owner = GPT_MSG_TYPES
      gptAnswer.chatRecord = data.data.replaceAll('\n', '<br/>')
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
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  color: white;
  text-align: center;
  .container {
    position: fixed;
    width: 100%;
    display: flex;
    flex-direction: column;
    .el-main {
      width: 50%;
      overflow: scroll;
      overflow-x: hidden;
      border-radius: 5px;
      padding: 0 5px 0 0;
      align-self: center;
      top: 0px;
      margin-top: 10px;
      height: 55vh;
    }
    // 滚动条
    .el-main::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    .footerDiv {
      background-color: #1e1b25;
      border-radius: 5px;
      width: 50%;
      padding: 8px;
      align-self: center;
      margin: 30px 0 100px 0;
      bottom: 0px;
    }
    .textareaSty {
      width: 100%;
      color: white;
      border: none;
      outline: none;
      resize: none;
      min-height: 42px;
      max-height: 150px;
      background-color: #1e1b25;
    }
    .btnBox {
      border: 0px;
      height: 40px;
      color: #b5b5b5;
    }
    .btnBox .el-button {
      float: right;
      margin: 0px 20px 0 0;
      background: linear-gradient(-27deg, #9b3c99 0%, #8f53ea 76%);
      border: 0px;
    }
    @media (max-width: 768px) {
      .el-main{
        width: 80%;
      }
      .footerDiv{
        width: 80%;
      }
    }
  }
}
</style>
