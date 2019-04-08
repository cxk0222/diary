<template>
  <div class="search">

    <div class="header">
      <img src="../assets/image/back.png" @click="goBack">
      <span>搜索</span>
    </div>

    <cube-input
      v-model="value"
      :clearable="clearable"
      :placeholder="placeholder"
      @keyup.native="debounceSearch"
    ></cube-input>

    <div class="card-wrapper">
      <div class="card" v-for="(diary, index) in diaries" :key="index" @click="goToDetail(diary)">
        <div class="left">
          <span class="left-date">{{ toFix(diary.date[2]) }}</span>
          <span class="left-day">{{ getWeek(diary.date) }}</span>
          <i class="iconfont" :class="diary.weather"></i>
        </div>

        <div class="right">
          <p class="quote">“</p>
          <p class="diary">
            {{ diary.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function debounce (fn, wait) {
  var timer = null;
  return function () {
    var context = this
    var args = arguments
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}
export default {
  data () {
    return {
      value: '',
      clearable: {
        visible: true,
        blurHidden: true
      },
      placeholder: '请输入关键词',
      diaries: '',
      weekTemplate: [
        '周日', 
        '周一', 
        '周二', 
        '周三', 
        '周四', 
        '周五', 
        '周六'
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goToDetail (diary) {
      this.store.set('diaryFromMonth', diary)
      this.$router.push({
        name: 'detail'
      })
    },
    toFix (n) {
      return (n + '').length === 1 ? ('0' + n + '') : (n + '')
    },
    getWeek (date) {
      let d = new Date(date[0], date[1], date[2])
      let day = d.getDay()
      return this.weekTemplate[day]
    },
    debounceSearch: debounce (function () {
      let v = this.value
      let diaries = this.storage.load()
      let afterFilter = this.filterData(diaries, v)
      this.diaries = afterFilter
    }, 500),
    filterData (diaries, search) {
      return diaries.filter(diary => {
        if (search === '') {
          return false
        } else {
          return diary.content.includes(search)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.search
  min-height 100vh
  background-color #fafafa
  .header
    position relative
    display flex
    align-items center
    height 1rem
    padding-top constant(safe-area-inset-top)
    padding-top env(safe-area-inset-top)
    // background-color #fafafa
    img
      height .3rem
      margin-left .35rem
    span
      position absolute
      left 50%
      transform translateX(-50%)

.card-wrapper
  padding-left 5%
  padding-bottom .5rem
  margin-top .3rem
  .card
    display flex
    height 2.17rem
    background-color #fff
    box-shadow: 0 4px 8px 0 rgba(186,186,186,0.30)
    margin-bottom .35rem
    overflow hidden
  .left
    display flex
    flex-direction column
    align-items center
    justify-content center
    width 17.5%
    height 100%
    border-right 1px solid #f3f3f3
    .left-date
      margin-bottom .085rem
      font-size 25px
      font-family Helvetica-Bold
    .left-day
      margin-bottom .15rem
      font-size 12px
      font-family PingFangSC-Regular
      color #2D2D2D
    i
      font-size 23px
      color #D8D8D8
  .right
    width 82.5%
    height 100%
    padding .22rem .125rem 0 .25rem
    box-sizing border-box
    .quote
      font-size 30px
      font-family Helvetica
      color #cccccc
    .diary
      position relative
      font-size 12px
      line-height 15px
      bottom .1rem
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 4
      -webkit-box-orient vertical
</style>
