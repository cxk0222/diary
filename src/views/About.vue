<template>
  <div class="about">

    <app-header title="关于我们"></app-header>

    <div class="logo-wrapper">
      <img src="../assets/image/gravatar.png">
      <p>当前版本为v1.0</p>
    </div>

  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="stylus" scoped>
.about
  background #fff
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

.logo-wrapper
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  text-align center
  color #999999
  img
    height 1rem
    margin-bottom .3rem
</style>
