<template>
  <cube-tab-bar
    v-model="selectedLabelDefault"
    :data="tabs"
    @click="clickHandler"
    @change="changeHandler">
  </cube-tab-bar>
</template>

<script>
export default {
  name: 'tabbar',
  data () {
    return {
      labelTemplate: {
        '首页': 'home',
        '我的': 'my'
      },
      selectedLabelDefault: '首页',
      tabs: [
        {
          label: '首页',
          icon: 'cubeic-home'
        },
        {
          label: '我的',
          icon: 'cubeic-person'
        }
      ]
    }
  },
  methods: {
    clickHandler () {
      // if you clicked home tab, then print 'Home'
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      // console.log(label)
      this.$router.push({
        name: this.labelTemplate[label]
      })
    }
  }
}
</script>

<style lang="stylus">
.cube-tab-bar
  display flex
  flex-direction row
  position fixed
  font-family PingFang-SC-Medium
  bottom 0
  left 0
  right 0
  width 100%
  z-index 100
  height 50px
  background #fff
  border-top 1px solid rgba(228,228,228, 0.5)
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  .cube-tab
    color #D8D8D8
    i
      font-size 20px
    div
      margin-top 4px
      font-size 10px
  .cube-tab_active
    color #518BFF
    i
      font-weight 800
    div
      font-weight 400
</style>
