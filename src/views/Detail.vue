<template>
  <div class="detail">

    <div class="header">
      <img src="../assets/image/back.png" @click="goBack">
      <span class="date">{{ date }}</span>
    </div>

    <div class="content">
      <!-- 走出去才会发现，世界上原来真的有很多很多种人，用各自不同的方式生活着。他们拥有不一样的价值观，让这个世界显得纷乱有趣。 -->
      <textarea @input="autosize" v-model="inputContent" ref="textarea" readonly></textarea>
    </div>

    <div class="option-bar">
      <div class="dot" @click="showDefault">…</div>
      <i class="iconfont" :class="diary.weather"></i>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      diary: '',
      date: '',
      inputContent: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    autosize (e) {
      let self = e.target
      self.style.height = 'auto'
      self.style.height = (self.scrollHeight) + 'px'
    },
    showDefault() {
      this.$createActionSheet({
        data: [
          {
            content: '保存',
            class: 'sheet-save'
          },
          {
            content: '编辑',
            class: 'sheet-edit'
          },
          {
            content: '删除',
            class: 'sheet-delete'
          }
        ],
        onSelect: (item, index) => {
          if (item.content === '编辑') {
            this.$refs.textarea.removeAttribute('readonly')
            this.$refs.textarea.focus()
          } else if (item.content === '删除') {
            this.deleteDiary()
          } else if (item.content === '保存') {
            this.saveDiary()
          } else {
            // do nothing
          }
        },
      }).show()
    },
    saveDiary () {
      let flag = this.isAllDataValid()
      if (flag) {
        let diaries = this.storage.load()
        let index = this.getDiaryIndex()
        let diary = diaries[index]
        diary.content = this.inputContent
        // 先删除 再 push 可以让该日记置顶
        this.storage.save(diaries)
        this.showToast('修改成功')

        let dateText = `${diary.date[0]}/${diary.date[1]}/01`
        this.store.set('dateText', dateText)

        setTimeout(() => {
          this.$router.push({
            name: 'month'
          })
        }, 500)
      }
    },
    deleteDiary () {
      let diaries = this.storage.load()
      let index = this.getDiaryIndex()
      let diary = diaries[index]

      let dateText = `${diary.date[0]}/${diary.date[1]}/01`
      this.store.set('dateText', dateText)

      diaries.splice(index, 1)
      this.storage.save(diaries)
      this.showToast('删除成功')

      setTimeout(() => {
        this.$router.push({
          name: 'month'
        })
      }, 500)
    },
    isAllDataValid () {
      if (!this.inputContent) {
        this.showToast('请输入日记内容')
        return false
      } else {
        return true
      }
    },
    getDiaryIndex () {
      let i
      let diaries = this.storage.load()
      diaries.forEach((d, index) => {
        if (d.ts === this.diary.ts) {
          i = index
        }
      })
      return i
    },
    formatDate (date) {
      let y = date[0]
      let m  = this.toFix(date[1])
      let d = this.toFix(date[2])
      return `${d}/${m}/${y}`
    },
    toFix (n) {
      return (n + '').length === 1 ? ('0' + n + '') : (n + '')
    },
    init () {
      this.diary = this.store.get('diaryFromMonth')
      this.inputContent = this.diary.content
      let date = this.diary.date
      console.log('date', date)
      this.date = this.formatDate(date)
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.$refs.textarea.setAttribute('style', 'height:' + (this.$refs.textarea.scrollHeight) + 'px;overflow-y:hidden;')
  }
}
</script>

<style lang="stylus" scoped>
.detail
  @media all
    min-height 620px
  @media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2)
    min-height 568px
  @media only screen and (min-device-width: 375px)and (-webkit-min-device-pixel-ratio: 2)
    min-height 667px
  @media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3)
    min-height 812px
  @media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3)
    min-height 736px
  .header
    display flex
    position relative
    align-items center
    height 1rem
    box-shadow 0 8px 16px 0 rgba(226,226,226,0.30)
    padding-top constant(safe-area-inset-top)
    padding-top env(safe-area-inset-top)
    img
      height .3rem
      margin-left .35rem
    span
      position absolute
      left 50%
      transform translateX(-45%)
      margin-top .05rem

.content
  box-sizing border-box
  width 100%
  // background-color #eee
  margin-top .64rem
  padding 0 .38rem 0 .38rem
  line-height .325rem
  color #303030
  font-size 14px
  textarea
    resize none
    outline none
    border none
    text-align justify
    // text-align-last left
    width 100%
    // min-height 500px
    min-height 200px
    // padding-bottom 1rem
    padding-bottom .5rem
    font-size 14px

.option-bar
  // position absolute
  position fixed
  display flex
  align-items center
  justify-content space-between
  height 1rem
  width 100%
  bottom 0
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  box-shadow 0 -8px 16px 0 rgba(227,227,227,0.30)
  z-index 100
  background-color #fff
  .dot
    position relative
    bottom .1rem
    font-size 33px
    font-weight 800
    margin-left .35rem
  i
    margin-right .4rem
    font-size 21px
    color #E5384F

</style>
