<template>
  <div class="appheader">
    <i class="cubeic-back" @click="goBack"></i>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    title: String
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.appheader
  position relative
  height .9rem
  line-height .9rem
  text-align center
  background #ff8a8a
  color #fff
  font-size 19px
  padding-top constant(safe-area-inset-top)
  padding-top env(safe-area-inset-top)
  i
    font-size 23px
    float left
    margin-left .2rem
  span
    margin-right .2rem
</style>
