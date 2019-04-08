<template>
  <div class="appbutton">
    <button :class="color">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    title: String,
    color: String
  }
}
</script>

<style lang="stylus" scoped>
.appbutton
  button
    display block
    width 58%
    height .56rem
    margin 0 auto
    padding 0
    outline none
    color #fff
    font-size 13px
    font-family PingFangSC-Regular
    border 1px solid transparent
    border-radius 28px
  .blue
    background #518BFF
    box-shadow 0 2px 6px 0 #88B0FF
  .red
    background #D90000
    box-shadow 0 2px 6px 0 #D0021B
  .orange
    background #FFA50A
  .pink
    opacity 0.5
    background-image linear-gradient(-90deg, #FF8A8A 0%, #FF4F66 100%)
</style>
