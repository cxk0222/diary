<template>
  <div id="app">
    <!-- <tab-bar v-show="isShowTabBar"></tab-bar> -->
    <!-- <app-tab v-show="isShowTabBar"></app-tab> -->
    <router-view/>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import AppTab from '@/components/Tab'
export default {
  components: {
    TabBar,
    AppTab
  },
  computed: {
    isShowTabBar () {
      return this.$route.meta.navShow
    }
  }
}
</script>


<style lang="stylus">
#app
  height 100%

.sheet-edit
  color #000!important

.sheet-delete
  color #FF582B!important

.sheet-save
  color #2D2D2D!important

.swiper-wrapper
  @media all
    padding-top 1rem
  @media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2)
    padding-top .6rem
  @media only screen and (min-device-width: 375px)and (-webkit-min-device-pixel-ratio: 2)
    padding-top .75rem
  @media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3)
    padding-top 1.35rem
  @media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3)
    padding-top .8rem
  padding-bottom .4rem!important
</style>
