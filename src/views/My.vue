<template>
  <div class="my">
    <div class="banner" @click.prevent="">
      <i class="iconfont icon-back1" @click="goBack"></i>
      <img src="../assets/image/gravatar.png" class="gravatar">
    </div>

    <div class="setting-bar about" @click="goToAbout">
      <i class="cubeic-warn icon-left"></i>
      <span>关于我们</span>
      <i class="cubeic-arrow icon-right"></i>
    </div>
    
    <div class="setting-bar remark" @click="goToAppStore">
      <i class="cubeic-good icon-left"></i>
      <span>去appstore评价</span>
      <i class="cubeic-arrow icon-right"></i>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.push({
        name: 'home'
      })
    },
    goToAbout () {
      this.$router.push({
        name: 'about'
      })
    },
    goToAppStore () {
      // window.webkit.messageHandlers.MengmaRunjs.postMessage({
      //   "sysmethod": "aplicationOpen",
      //   "params": {
      //     "link": "https://www.baidu.com"
      //   }      
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
.my
  min-height 100vh
.banner
  position relative
  display flex
  flex-direction column
  align-items center
  justify-content center
  height 3.78rem
  color #fff
  font-size 15px
  background-image url(../assets/image/my-bg.png)
  background-size 100% 100%
  padding-top constant(safe-area-inset-top)
  padding-top env(safe-area-inset-top)
  .gravatar
    height .88rem
  i
    position absolute
    font-size 28px
    height .3rem
    left .3rem
    margin-top -1.4rem

.setting-bar
  display flex
  position relative
  align-items center
  width 83%
  height 1.03rem
  .icon-left
    color #BABFC9
    font-size 25px
  span
    margin-left .19rem
    color #333333
    font-size 17px
  .icon-right
    position absolute
    right 0
    color #BABFC9
    font-size 20px

.about
  margin .43rem auto 0

.remark
  margin .25rem auto 0
</style>
