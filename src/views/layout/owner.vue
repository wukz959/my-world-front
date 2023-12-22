<template>
  <div class="app" ref="appRef">
    <div class="container">
      <transition name="slide-fade" mode="out-in">
        <div v-if="show" key="noteKey">
          <div class="main">
            <div v-for="(item,index) in openSource.data" :key="item.id" @click="handleOpenSourceClick(index)">
              <OpenSource :openSource="item"></OpenSource>
            </div>
            <div ref="blogBoxRef" v-for="(item,index) in myBlogs.data" :key="item.id">
              <BlogNotes @noteClick="handleNoteClick(index)" :blog="item"></BlogNotes>
            </div>

          </div>
        </div>
        <div v-else key="contentKey">
          <BlogContent :detailBlog="detailBlog" @changeView = "show = true"></BlogContent>
        </div>
      </transition>
      <div class="myBeian" v-html="beianTxt"></div>
    </div>
  </div>
</template>

<script>
import BlogNotes from '@/components/BlogNotes'
import BlogContent from '@/components/BlogContent'
import OpenSource from '@/components/OpenSource'
import { blogGetReq, openSourceGetReq } from '@/api/owner'
import { BEI_AN } from '@/utils/constants'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Owner',
  data () {
    return {
      show: true,
      source: {},
      detailBlog: {},
      beianTxt: BEI_AN
    }
  },
  components: {
    BlogNotes,
    BlogContent,
    OpenSource
  },
  computed: {
    ...mapState('ownerVuex', ['myBlogs', 'openSource'])
  },
  async mounted () {
    if (this.myBlogs.length === 0 || this.openSource.length === 0) {
      const myBlogs = await blogGetReq()
      const openSource = await openSourceGetReq()
      this.setMyBlogs(myBlogs)
      this.setOpenSource(openSource)
    }
  },
  methods: {
    ...mapMutations('ownerVuex', ['setMyBlogs', 'setOpenSource']),
    handleNoteClick (index) {
      this.detailBlog = this.myBlogs.data[index]
      this.show = false
      this.$refs.appRef.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleOpenSourceClick (index) {
      this.detailBlog = this.openSource.data[index]
      this.show = false
      this.$refs.appRef.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  .container{
    overflow: auto;
    .main {
      display: flex;
      flex-direction: column;
      padding: 3vh 18vw;
      border-radius: 2px;
      overflow: auto;
    }
    .myBeian {
      position: absolute;
      padding: 3px 0 5px 0;
      font-size: small;
      width: 100%;
      text-align: center;
      color: gray;
    }
  }

  @media (max-width: 800px){
  .container{
    .main{
      padding: 3vh 15vw;
    }
  }
  }

}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter {
  position: "absolute";
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  // transform: translateX(100px);
  opacity: 0;
}
</style>
