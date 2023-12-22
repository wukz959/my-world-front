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
      <span ref="titleRef"> synchronized锁升级原理 </span>
      <span ref="contentRef" class="editorContent">
        <!-- 文章内容 -->
<p><span style="font-size:11.0pt"><strong><span style="font-family:&quot;Microsoft YaHei&quot;">写在前面</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">，本节笔记默认读者已有</span><span style="font-family:Calibri">Monitor</span><span style="font-family:&quot;Microsoft YaHei&quot;">、轻量级锁结构等锁知识，如果不想看全部，可直接跳到后面看文章总结</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">线程一开始获取到的是偏向锁，如果线程</span><span style="font-family:Calibri">a</span><span style="font-family:&quot;Microsoft YaHei&quot;">持有锁期间发生了锁重入，就无需进行</span><span style="font-family:Calibri">cas</span><span style="font-family:&quot;Microsoft YaHei&quot;">操作，直接判断锁标识是否为自己即可；但如果期间有其他线程来尝试获取锁，该锁就会被升级为轻量级锁，示例：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-1.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">ps</span><span style="font-family:&quot;Microsoft YaHei&quot;">：</span><span style="font-family:Calibri">wait</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法与</span><span style="font-family:Calibri">notify</span><span style="font-family:&quot;Microsoft YaHei&quot;">方法保证了先执行完</span><span style="font-family:Calibri">t1</span><span style="font-family:&quot;Microsoft YaHei&quot;">线程代码才会开始执行</span><span style="font-family:Calibri">t2</span><span style="font-family:&quot;Microsoft YaHei&quot;">线程代码</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">输出：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-2.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">1</span><span style="font-family:&quot;Microsoft YaHei&quot;">）这里为了方便观察只截取输出的头格式字符串，并将</span><span style="font-family:Calibri">16</span><span style="font-family:&quot;Microsoft YaHei&quot;">进制转换为了</span><span style="font-family:Calibri">10</span><span style="font-family:&quot;Microsoft YaHei&quot;">进制（与上面代码实际输出不符）。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">2</span><span style="font-family:&quot;Microsoft YaHei&quot;">）不难发现，（看不懂图也没关系，直接看结论即可）在第一个线程获取锁</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">结束后</span></strong><span style="font-family:Calibri">dog</span><span style="font-family:&quot;Microsoft YaHei&quot;">对象的锁还是</span><span style="font-family:Calibri">t1</span><span style="font-family:&quot;Microsoft YaHei&quot;">的偏向锁（</span><span style="font-family:Calibri">dog</span><span style="font-family:&quot;Microsoft YaHei&quot;">的对象头的</span><span style="font-family:Calibri">markword</span><span style="font-family:&quot;Microsoft YaHei&quot;">为</span><span style="font-family:Calibri">t1</span><span style="font-family:&quot;Microsoft YaHei&quot;">线程</span><span style="font-family:Calibri">id</span><span style="font-family:&quot;Microsoft YaHei&quot;">），</span><span style="font-family:Calibri">t2</span><span style="font-family:&quot;Microsoft YaHei&quot;">获取锁时偏向锁就变成了轻量级锁了（对象头的</span><span style="font-family:Calibri">markword</span><span style="font-family:&quot;Microsoft YaHei&quot;">没有</span><span style="font-family:Calibri">t2</span><span style="font-family:&quot;Microsoft YaHei&quot;">的线程</span><span style="font-family:Calibri">id</span><span style="font-family:&quot;Microsoft YaHei&quot;">，最后两位变成</span><span style="font-family:Calibri">00</span><span style="font-family:&quot;Microsoft YaHei&quot;">），释放锁后就变成</span><span style="font-family:Calibri">State</span><span style="font-family:&quot;Microsoft YaHei&quot;">为</span><span style="font-family:Calibri">Normal</span><span style="font-family:&quot;Microsoft YaHei&quot;">的锁了（最后三位为</span><span style="font-family:Calibri">001</span><span style="font-family:&quot;Microsoft YaHei&quot;">，</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">前</span></strong><strong><span style="font-family:Calibri">62</span></strong><strong><span style="font-family:&quot;Microsoft YaHei&quot;">位为</span></strong><strong><span style="font-family:Calibri">0</span></strong><strong><span style="font-family:&quot;Microsoft YaHei&quot;">是因为还没获取锁</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">）。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">为轻量锁期间，假如线程</span><span style="font-family:Calibri">a</span><span style="font-family:&quot;Microsoft YaHei&quot;">获取到了锁，发生了锁重入还是可以继续持有锁，重入的栈帧的</span><span style="font-family:Calibri">LockRecord</span><span style="font-family:&quot;Microsoft YaHei&quot;">为</span><span style="font-family:Calibri">Null</span><span style="font-family:&quot;Microsoft YaHei&quot;">；如果持有锁期间有其他线程来尝试获取锁，就说明锁依然存在竞争，会先进行自旋（重复循环几次尝试获取锁），自旋几次过后如果还是没获取到锁，就将锁升级为重量级锁，注意：</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">轻量级锁不存在线程阻塞的概念</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">，线程会将锁先升级为重量级锁后再进入</span><span style="font-family:Calibri">EntryList</span><span style="font-family:&quot;Microsoft YaHei&quot;">阻塞；</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">升级为重量级锁后，锁的争抢走的就是重量级锁的锁竞争流程，可参考下图：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-3.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">Owner</span><span style="font-family:&quot;Microsoft YaHei&quot;">为持有锁的线程标识；</span><span style="font-family:Calibri">EntryList</span><span style="font-family:&quot;Microsoft YaHei&quot;">为争抢锁陷入阻塞的线程队列；</span><span style="font-family:Calibri">WaitSet</span><span style="font-family:&quot;Microsoft YaHei&quot;">为获得锁但某些条件不满足把锁释放的线程</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">至于</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">锁的释放</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">，如果释放锁时锁仍然为轻量级锁，就先把重入的锁（</span><span style="font-family:Calibri">null</span><span style="font-family:&quot;Microsoft YaHei&quot;">头，每重入一次多一个栈帧的</span><span style="font-family:Calibri">Lock Record</span><span style="font-family:&quot;Microsoft YaHei&quot;">）一个一个释放掉，直到把最后的</span><span style="font-family:Calibri">LockRecord</span><span style="font-family:&quot;Microsoft YaHei&quot;">释放掉：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-4.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">ps</span><span style="font-family:&quot;Microsoft YaHei&quot;">：</span><span style="font-family:Calibri">Object</span><span style="font-family:&quot;Microsoft YaHei&quot;">可看成锁对象本身</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">最后再将</span><span style="font-family:Calibri">Object</span><span style="font-family:&quot;Microsoft YaHei&quot;">恢复成没加锁的状态：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-5.png" /></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">如果释放锁时，锁已经被升级为重量级锁了，即</span><span style="font-family:&quot;Microsoft YaHei&quot;">Thread-0</span><span style="font-family:&quot;Microsoft YaHei&quot;">尝试使用</span><span style="font-family:&quot;Microsoft YaHei&quot;">cas</span><span style="font-family:&quot;Microsoft YaHei&quot;">将</span><span style="font-family:&quot;Microsoft YaHei&quot;">Mark Word</span><span style="font-family:&quot;Microsoft YaHei&quot;">值恢复对对象头，失败，就发现得走重量级锁的释放流程，（锁重入的情况应该是会先将原本重入的</span><span style="font-family:Calibri">Lock Record</span><span style="font-family:&quot;Microsoft YaHei&quot;">释放掉，直到不为</span><span style="font-family:Calibri">null</span><span style="font-family:&quot;Microsoft YaHei&quot;">的</span><span style="font-family:Calibri">record</span><span style="font-family:&quot;Microsoft YaHei&quot;">走剩下流程）按照</span><span style="font-family:Calibri">Monitor</span><span style="font-family:&quot;Microsoft YaHei&quot;">地址找到</span><span style="font-family:Calibri">Monitor</span><span style="font-family:&quot;Microsoft YaHei&quot;">对象，会将</span><span style="font-family:Calibri">Owner</span><span style="font-family:&quot;Microsoft YaHei&quot;">设为</span><span style="font-family:Calibri">Null</span><span style="font-family:&quot;Microsoft YaHei&quot;">，并唤醒</span><span style="font-family:Calibri">EntryList</span><span style="font-family:&quot;Microsoft YaHei&quot;">中</span><span style="font-family:Calibri">BLOCKED</span><span style="font-family:&quot;Microsoft YaHei&quot;">线程（争抢重量级锁是非公平竞争）：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-6.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">其实偏向锁部分还有批量重偏向、批量撤销等点没说，感觉直接加进去会增加文章的理解难度，所以这里对偏向锁单独拿出来做个小点。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">如果对象虽然被多个线程访问，但没有竞争，这时偏向了线程</span><span style="font-family:Calibri"> T1 </span><span style="font-family:&quot;Microsoft YaHei&quot;">的对象仍有机会重新偏向</span><span style="font-family:Calibri"> T2</span><span style="font-family:&quot;Microsoft YaHei&quot;">，重偏向会重置对象 的</span><span style="font-family:Calibri"> Thread ID </span><span style="font-family:&quot;Microsoft YaHei&quot;">，当撤销偏向锁阈值超过</span><span style="font-family:Calibri"> 20 </span><span style="font-family:&quot;Microsoft YaHei&quot;">次后，</span><span style="font-family:Calibri">jvm </span><span style="font-family:&quot;Microsoft YaHei&quot;">会这样觉得，我是不是偏向错了呢，于是会在给这些对象加锁时重新偏向至 加锁线程</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">示例：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-7.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">1</span><span style="font-family:&quot;Microsoft YaHei&quot;">）</span><span style="font-family:Calibri">t1</span><span style="font-family:&quot;Microsoft YaHei&quot;">线程会多次获取不同锁（对象不同），由于此时这些对象</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">都是第一次被获取</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">，所以它们都是</span><span style="font-family:Calibri">t1</span><span style="font-family:&quot;Microsoft YaHei&quot;">线程的偏向锁（线程头的</span><span style="font-family:Calibri">markword</span><span style="font-family:&quot;Microsoft YaHei&quot;">为</span><span style="font-family:Calibri">t1</span><span style="font-family:&quot;Microsoft YaHei&quot;">的线程</span><span style="font-family:Calibri">id</span><span style="font-family:&quot;Microsoft YaHei&quot;">）</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">2</span><span style="font-family:&quot;Microsoft YaHei&quot;">）执行完再调用</span><span style="font-family:Calibri">notify</span><span style="font-family:&quot;Microsoft YaHei&quot;">通知</span><span style="font-family:Calibri">t2</span><span style="font-family:&quot;Microsoft YaHei&quot;">可以执行</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">2</span><span style="font-family:&quot;Microsoft YaHei&quot;">）</span><span style="font-family:Calibri">t2</span><span style="font-family:&quot;Microsoft YaHei&quot;">会尝试获取已经偏向其他线程（</span><span style="font-family:Calibri">t1</span><span style="font-family:&quot;Microsoft YaHei&quot;">）的锁（偏向锁）</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:Calibri">3</span><span style="font-family:&quot;Microsoft YaHei&quot;">）使用</span><span style="font-family:Calibri">Vector</span><span style="font-family:&quot;Microsoft YaHei&quot;">是因为该类是线程安全的，而</span><span style="font-family:Calibri">ArrayList</span><span style="font-family:&quot;Microsoft YaHei&quot;">不是</span></span></p>

<p><span style="font-size:11.0pt"><strong><span style="font-family:Calibri">t1</span></strong><strong><span style="font-family:&quot;Microsoft YaHei&quot;">开始时</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-8.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">此时全是</span><span style="font-family:Calibri">t1</span><span style="font-family:&quot;Microsoft YaHei&quot;">的偏向锁</span></span></p>

<p><span style="font-size:11.0pt"><strong><span style="font-family:&quot;Microsoft YaHei&quot;">轮到</span></strong><strong><span style="font-family:Calibri">t2</span></strong><strong><span style="font-family:&quot;Microsoft YaHei&quot;">时</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-9.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">一开始获取锁，由于这些锁全都有主人，所以获取锁时会将锁升级成轻量级锁（</span><span style="font-family:Calibri">00</span><span style="font-family:&quot;Microsoft YaHei&quot;">结尾），获取锁后变成</span><span style="font-family:Calibri">State</span><span style="font-family:&quot;Microsoft YaHei&quot;">为</span><span style="font-family:Calibri">Normal</span><span style="font-family:&quot;Microsoft YaHei&quot;">的锁（</span><span style="font-family:Calibri">001</span><span style="font-family:&quot;Microsoft YaHei&quot;">结尾）。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">获取次数超过</span><span style="font-family:Calibri">20</span><span style="font-family:&quot;Microsoft YaHei&quot;">时（下标从</span><span style="font-family:Calibri">0</span><span style="font-family:&quot;Microsoft YaHei&quot;">开始）：</span></span></p>

<p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/image-20231222100845-10.png"/></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">在第二十次获取锁开始，获取的锁全变成</span><span style="font-family:Calibri">t2</span><span style="font-family:&quot;Microsoft YaHei&quot;">的偏向锁。</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">而对于批量撤销（这里就不给</span><span style="font-family:Calibri">demo</span><span style="font-family:&quot;Microsoft YaHei&quot;">了），当撤销偏向锁阈值超过</span><span style="font-family:&quot;Microsoft YaHei&quot;"> 40 </span><span style="font-family:&quot;Microsoft YaHei&quot;">次后，</span><span style="font-family:&quot;Microsoft YaHei&quot;">jvm </span><span style="font-family:&quot;Microsoft YaHei&quot;">会这样觉得，自己确实偏向错了，根本就不该偏向。于是整个类的所有对象都会变为</span><strong><span style="font-family:&quot;Microsoft YaHei&quot;">不可偏向</span></strong><span style="font-family:&quot;Microsoft YaHei&quot;">的，新建的对象也是不可偏向的</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<h2><span style="font-size:14.0pt"><span style="color:#2e75b5"><span style="font-family:&quot;Microsoft YaHei&quot;">加锁流程</span><span style="font-family:Calibri">-</span><span style="font-family:&quot;Microsoft YaHei&quot;">简单总结</span></span></span></h2>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">用</span><span style="font-family:Calibri">synchronized</span><span style="font-family:&quot;Microsoft YaHei&quot;">加锁时第一次加的是偏向锁，当锁有竞争时就会升级为轻量级锁，升级为轻量级锁后有可能遇到批量重偏向的情况导致锁降级为偏向锁（两个线程）；但无论哪种情况，只要一直存在锁竞争，锁最终都会被升级为重量级锁（轻量级锁在升级为重量级锁之前，如果只有两个线程在争抢锁，争抢失败的线程会先自旋几次等待锁释放，自旋期间获取到锁就不会升级为重量级锁，而如果自旋结束没获取到锁，或者有第三个线程插插足竞争就会直接升级为重量级锁）</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">&nbsp;</span></span></p>

<p><span style="font-size:11.0pt"><span style="font-family:&quot;Microsoft YaHei&quot;">可以理解为，偏向锁与轻量级锁为乐观锁，在竞争不强烈时会避免让线程直接阻塞；重量级锁为悲观锁，直接独占锁，其他尝试获取锁的线程会被直接阻塞，防止</span><span style="font-family:Calibri">CPU</span><span style="font-family:&quot;Microsoft YaHei&quot;">空转</span></span></p>

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
