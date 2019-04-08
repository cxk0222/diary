<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="route-view"/>
    </transition>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  components: {
    TabBar,
  },
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {
    isShowTabBar () {
      return this.$route.meta.navShow
    }
  },
  watch: {
    '$route' (to, from) {
      const routerDeep = ['/', '/add', '/date', '/month', '/detail', '/search', '/my']
      const toDepth = routerDeep.indexOf(to.path)
      const fromDepth = routerDeep.indexOf(from.path)
      console.log('toDepth', toDepth)
      console.log('fromDepth', fromDepth)
      if ( (toDepth !== -1 && fromDepth !== -1) && (toDepth > fromDepth) ) {
        this.transitionName = 'fold-left'
      } else if ( ((toDepth !== -1 && fromDepth !== -1) && (toDepth < fromDepth))) {
        this.transitionName = 'fold-right'
      } else {
        this.transitionName = ''
      }
    }
  }
}
</script>


<style lang="stylus">
#app
  height 100%

.route-view
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  
.sheet-edit
  color #000!important

.sheet-delete
  color #FF582B!important

.sheet-save
  color #2D2D2D!important

.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: .3s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: .3s;
}

@keyframes fold-left-in {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: .3s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: .3s;
}
@keyframes fold-right-in{
  0% {
    width: 100%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out  {
  0% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    width: 100%;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}

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
