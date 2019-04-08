<template>
  <div class="tab-bar">
    <img src="../assets/image/add.png" class="add" @click="goToAdd">
    <img src="../assets/image/my.png" class="my" @click="goToMy">
  </div>
</template>

<script>
export default {
  name: 'AppTab',
  props: {

  },
  data () {
    return {

    }
  },
  methods: {
    goToAdd () {
      this.$router.push({
        name: 'add'
      })
    },
    goToMy () {
      this.$router.push({
        name: 'my'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab-bar
  // display flex
  // flex-direction row
  position fixed
  font-family PingFang-SC-Medium
  bottom 10px
  left 0
  right 0
  width 100%
  z-index 100
  height 50px
  background transparent
  // border-top 1px solid rgba(228,228,228, 0.5)
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  img
    height 45px
  .add
    margin-left 50%
    transform translateX(-50%)
  .my
    float right
    margin-right .5rem
</style>
