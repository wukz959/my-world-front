<template>
<!-- 注意：本页面供自己开发使用，用于编辑保存文章，生产环境不能出现。将实现编辑好的文章通过：https://onlinehtmleditor.dev/  转换为html文档
    后，复制html文档替换下面 ref为"contentRef"的span节点包裹的内容（innerhtml），点击保存就可保存到后端，注意删除html文档img标签的style
    属性，兼容移动端-->

  <div class="editorApp">
    <div @click="handleSave" class="editorSaveBtn">save</div>
    <div key="editorContentKey">
      <BlogContent
        :detailBlog="detailBlog"
        @changeView="show = true"
      ></BlogContent>
    </div>
    <div class="editorTitleBox" style="display: none">
      <span ref="titleRef"> ThreadLocal原理-源码剖析 </span>
      <span ref="contentRef" class="editorContent">
        <!-- 文章内容 -->
<h2><span style="font-size:14.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;"><span style="color:#2e75b5">引入</span></span></span></h2>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218163925-19.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">先来个简单示例：</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">创建</span><span style="font-family:Calibri">Utils</span><span style="font-family:&quot;Microsoft YaHei&quot;">工具类，模拟线程池创建获取数据库连接，并保存到当前线程的</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">里；然后</span><span style="font-family:Calibri">main</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法里创建多线程尝试获取连接保存到</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">里</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218163925-20.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">输出：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218163925-21.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">当然，如果是一个线程调用多次，结果就是一样的了：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218163925-22.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">&nbsp;</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218163925-23.png" /></p>

<h2><span style="font-size:14.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;"><span style="color:#2e75b5">原理</span></span></span></h2>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-24.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">&nbsp;</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-25.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">1</span><span style="font-family:&quot;Microsoft YaHei&quot;">）以</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">自己为</span><span style="font-family:Calibri">key</span><span style="font-family:&quot;Microsoft YaHei&quot;">：以上面的示例为例，主线程创建静态</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">常量</span><span style="font-family:Calibri">tl</span><span style="font-family:&quot;Microsoft YaHei&quot;">，</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">子线程</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">调用其</span><span style="font-family:Calibri">set</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法传入要插入的数据</span><span style="font-family:Calibri">val</span><span style="font-family:&quot;Microsoft YaHei&quot;">：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-26.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">来到：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-27.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">1</span><span style="font-family:&quot;Microsoft YaHei&quot;">）先获取当前线程，然后调用</span><span style="font-family:Calibri">getMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法获取该线程的</span><span style="font-family:Calibri">ThreadLocalMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">成员变量</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">任何一个线程都有一个</span><span style="font-family:Calibri">ThreadLocalMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">成员变量，这里的</span><span style="font-family:Calibri">getMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法就是获取</span><span style="font-family:Calibri">t</span><span style="font-family:&quot;Microsoft YaHei&quot;">线程的这个成员变量：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-28.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">可到</span><span style="font-family:Calibri">Thread</span><span style="font-family:&quot;Microsoft YaHei&quot;">类查看：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-29.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">2</span><span style="font-family:&quot;Microsoft YaHei&quot;">）然后调用</span><span style="font-family:Calibri">ThreadLocalMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">成员变量的</span><span style="font-family:Calibri">set</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法，往这个</span><span style="font-family:Calibri">map</span><span style="font-family:&quot;Microsoft YaHei&quot;">里插入</span><span style="font-family:Calibri">value</span><span style="font-family:&quot;Microsoft YaHei&quot;">，</span><strong><span style="font-family:Calibri">key</span></strong><strong><span style="font-family:&quot;Microsoft YaHei&quot;">为调用这个</span></strong><strong><span style="font-family:Calibri">set</span></strong><strong><span style="font-family:&quot;Microsoft YaHei&quot;">方法的</span></strong><strong><span style="font-family:Calibri">ThreadLocal</span></strong><strong><span style="font-family:&quot;Microsoft YaHei&quot;">对象</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><strong><span style="font-family:&quot;Microsoft YaHei&quot;">总结</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">：每个线程都会自己维护一个</span><span style="font-family:Calibri">ThreadLocalMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">成员变量。当线程每次要创建自己的线程隔离的元素时，就通过创建一个</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">对象，调用</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">对象的</span><span style="font-family:Calibri">set</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法来保存这个元素。</span><span style="font-family:Calibri">set</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法内部调用</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">当前线程的</span></strong><strong><span style="font-family:Calibri">ThreadLocalMap</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">，以</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">对象作为</span><span style="font-family:Calibri">key</span><span style="font-family:&quot;Microsoft YaHei&quot;">，要插入的元素作为</span><span style="font-family:Calibri">value</span><span style="font-family:&quot;Microsoft YaHei&quot;">存储数据。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">所以说，线程每次要创建线程隔离的元素时，就要创建一个</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">，每个</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">对应一个</span><span style="font-family:Calibri">value</span><span style="font-family:&quot;Microsoft YaHei&quot;">，要创建多个元素就得创建多个</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">。而获取元素同理，要获取哪个元素，就得在对应线程使用相应的</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">调用</span><span style="font-family:Calibri">get()</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法获取</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;"><strong>注意</strong>：</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">1</span><span style="font-family:&quot;Microsoft YaHei&quot;">）一个线程的多个</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">共享一个</span><span style="font-family:Calibri">ThreadLocalMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">，如果多个</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">是同一个对象（或者说一个</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">调用</span><span style="font-family:Calibri">set</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法多次），那么他们将只保留最后一次的值</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">2</span><span style="font-family:&quot;Microsoft YaHei&quot;">）由于不同线程均是维护一个自己的</span><span style="font-family:Calibri">ThreadLocalMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">变量，所以允许多个线程使用同一个</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">来</span><span style="font-family:Calibri">set</span><span style="font-family:&quot;Microsoft YaHei&quot;">值，得到的值最终也将是各自线程各自的值。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">ThreadLocalMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">底层其实就是一个</span><span style="font-family:Calibri">map</span><span style="font-family:&quot;Microsoft YaHei&quot;">，</span><span style="font-family:Calibri">map</span><span style="font-family:&quot;Microsoft YaHei&quot;">的实现就是在数组进行</span><span style="font-family:Calibri">hash</span><span style="font-family:&quot;Microsoft YaHei&quot;">嘛，插入元素时，每个元素作为</span><span style="font-family:Calibri">value</span><span style="font-family:&quot;Microsoft YaHei&quot;">，</span><span style="font-family:Calibri">key</span><span style="font-family:&quot;Microsoft YaHei&quot;">值则是由</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">自己根据</span><span style="font-family:Calibri">value</span><span style="font-family:&quot;Microsoft YaHei&quot;">值进行计算，如果出现了</span><span style="font-family:Calibri">hash</span><span style="font-family:&quot;Microsoft YaHei&quot;">冲突，就会找下一位，下一位不为空则接着找下一位，直到找到为空的位置（</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">开放寻址法</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">，下面补充，像</span><span style="font-family:Calibri">hashmap</span><span style="font-family:&quot;Microsoft YaHei&quot;">是拉链法</span> <span style="font-family:Calibri">[</span><span style="font-family:&quot;Microsoft YaHei&quot;">链表</span><span style="font-family:Calibri">+</span><span style="font-family:&quot;Microsoft YaHei&quot;">红黑树</span><span style="font-family:Calibri">] </span><span style="font-family:&quot;Microsoft YaHei&quot;">），如果找到末尾，它会</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">回到起点</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">继续寻找。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">再看一下</span><span style="font-family:Calibri">ThreadLocal</span><span style="font-family:&quot;Microsoft YaHei&quot;">的</span><span style="font-family:Calibri">get</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-30.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">getMap</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-31.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">可发现，返回的其实就是每个线程自带的</span><span style="font-family:Calibri">map</span><span style="font-family:&quot;Microsoft YaHei&quot;">成员变量</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<h2><span style="font-size:14.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;"><span style="color:#2e75b5">开放寻址法</span></span></span></h2>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">对于开放寻址法而言，它要求表长度要大于等于所需要存放的元素数量。</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231218164030-32.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">开放定址法的缺点在于<strong>删除元素</strong>的时候不能真的删除，否则会引起查找错误，只能做一个特殊标记，直到有下个元素插入才能真正删除该元素。</span></span></p>

<p>&nbsp;</p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">顺便补充两个</span><span style="font-family:Calibri">tips</span><span style="font-family:&quot;Microsoft YaHei&quot;">：</span></span></p>

<p><span style="font-size:12.0pt"><span style="font-family:&quot;PingFang SC&quot;"><span style="color:black"><span style="background-color:white"><strong>装载因子</strong></span><span style="background-color:white">：load fator，散列表中关键字个数和散列表长度之比。她用于度量所有关键字填充哈希表后饱和的程度。</span></span></span></span></p>

<p><span style="font-size:12.0pt"><span style="font-family:&quot;PingFang SC&quot;"><span style="color:black"><span style="background-color:white"><strong>重哈希</strong></span><span style="background-color:white">：rehash，亦或再散列，当装载因子达到指定阈值时，散列表进行扩容的过程。</span></span></span></span></p>

      </span>
    </div>
  </div>
</template>

<script>
import { getLocalTime } from '@/utils/time'
import BlogContent from '@/components/BlogContent'
import { blogSaveReq } from '@/api/owner'
export default {
  data () {
    return {
      detailBlog: {}
    }
  },
  components: {
    BlogContent: BlogContent
  },
  mounted () {
    this.showBlog()
  },
  methods: {
    showBlog () {
      const obj = {}
      obj.title = this.$refs.titleRef.innerHTML
      obj.content = this.$refs.contentRef.innerHTML
      obj.types = 'BLOG'
      // obj.types = 'OPEN_SOURCE'
      obj.createTime = getLocalTime()
      obj.updateTime = getLocalTime()
      this.detailBlog = obj
    },
    async handleSave () {
      await blogSaveReq(this.detailBlog)
    }
  }
}
</script>

<style lang="less" scoped>
.editorApp {
  background: fixed no-repeat center/12% url('@/assets/background.png'),linear-gradient(to bottom right, rgba(30, 29, 67,0.8), rgba(43, 29, 99,0.3));
  border-radius: 4px;
  .editorSaveBtn {
    width: 3em;
    height: 1.5em;
    background-color: aliceblue;
    border: 1px solid gray;
    border-radius: 3px;
    text-align: center;
    margin: 5px 5px;
  }
  .editorTitleBox {
    background: #9b9aac;
    opacity: 0.5;
    width: 60vw;
    .editorContent .img{
        max-width: 100%;
    }
  }
}
</style>
