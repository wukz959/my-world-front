<template>
  <div class="app">
    <div class="container">
      <el-main>
        <div v-for="item in chatRecords" :key="item.chatRecord">
          <DialogBox :chatBox="item" :isSmallScreen="isSmallScreen" @refresh="refreshAns"></DialogBox>
        </div>
      </el-main>
      <div class="footerDiv">
        <textarea
          placeholder="输入看看"
          class="textareaSty"
          :maxlength="maxLength"
          rows="3"
          v-model="inputText"
          @keydown.enter="commitQuestion"
        ></textarea>
        <div class="btnBox">
          {{ count }}/{{ maxLength }}
          <el-button
            type="primary"
            icon="el-icon-thumb"
            :size="isSmallScreen ? 'small' : 'medium'"
            :disabled="isBlocked"
            @click="commitQuestion"
            circle
          ></el-button>
        </div>
      </div>
      <div class="beian" v-html="beianTxt"></div>
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
      .el-button {
        float: right;
        margin: 0px 20px 0 0;
        background: linear-gradient(-27deg, #9b3c99 0%, #8f53ea 76%);
        border: 0px;
      }
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
