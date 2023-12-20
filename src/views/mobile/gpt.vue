<template>
  <div class="app">
    <div class="main">
      <el-main class="chatDialog">
        <div v-for="item in chatRecords" :key="item.chatRecord">
          <DialogBox :chatBox="item" :isSmallScreen="isSmallScreen" @refresh="refreshAns"></DialogBox>
        </div>
      </el-main>
      <div class="chatInputBox">
        <div>{{ count }}/{{maxLength}}</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4}"
          placeholder="说出你的想法 ~"
          v-model="inputText"
          class="textareaSty"
          >
        </el-input>
        <div class="chatBtn" @click="commitQuestion">send</div>
      </div>
    </div>
  </div>
</template>

<script>
import { gptCommonMethods } from '@/mixins/gpt'
export default {
  name: 'Gpt',
  mixins: [gptCommonMethods]
}
</script>

<style lang="less" scoped>
#app {
  color: #ffffff;
  text-align: center;
  .main{
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: 60.8px;
    .chatDialog{
      flex: 10;
      overflow-y: auto;
      padding: 0 4px;
    }
    .chatInputBox{
      color: #ffffff;
      background: linear-gradient(to bottom right, rgba(30, 29, 67,0.8), rgba(43, 29, 99,0.3));
      min-height: 3em;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
      .textareaSty{
        background-color: #ffffff;
        border-radius: 2px;
        margin: 5px 5px;
      }
      .chatBtn{
        border-radius: 5px;
        width: 4em;
        text-align: center;
        vertical-align: middle;
        height: 1.7em;
        line-height: 1.7em;
        background: #08c060;
      }
    }
  }
}
</style>
