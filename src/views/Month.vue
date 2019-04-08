<template>
  <div class="month">

    <div class="header">
      <img src="../assets/image/back.png" @click="goBack">
    </div>

    <p class="date">
      <!-- 2018年12月 -->
      {{ showDate }}
    </p>

    <div class="card-wrapper">

      <!-- <div class="card" @click="goToDetail">

        <div class="left">
          <span class="left-month">26</span>
          <span class="left-day">周三</span>
          <i class="iconfont icon-yun"></i>
        </div>

        <div class="right">
          <p class="quote">“</p>
          <div class="diary">
            旅行会改变人的气质，让人的目光变得更加长远。在旅途中，你会看到不同的人有不同的习惯，你才能了解到，并不是每个人都按照你的生活方式在生活。这样，人的心胸才会变得更加...这样，人的心胸才会变得更加...这样，人的心胸才会变得更加...这样，人的心胸才会变得更加...这样，人的心胸才会变得更加...
          </div>
        </div>

      </div> -->

      <div class="card" v-for="(diary, index) in diaries" :key="index" @click="goToDetail(diary)">

        <div class="left">
          <span class="left-date">{{ toFix(diary.date[2]) }}</span>
          <!-- <span class="left-day">周三</span> -->
          <span class="left-day">{{ getWeek(diary.date) }}</span>
          <!-- <i class="iconfont icon-yun"></i> -->
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
export default {
  data () {
    return {
      date: '',
      year: '',
      month: '',
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
  computed: {
    showDate () {
      let d = this.date
      let y = d.getFullYear()
      let m = d.getMonth() + 1
      return `${y}年${m}月`
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        name: 'home'
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
    goToDetail (diary) {
      // console.log('diary', diary)
      this.store.set('diaryFromMonth', diary)
      this.$router.push({
        name: 'detail'
      })
    },
    initDate () {
      let d = this.store.get('dateText')
      this.date = new Date(d)
      // console.log('date', this.date)
      this.year = this.date.getFullYear()
      // month 从 0 开始
      this.month = this.date.getMonth() + 1
      // console.log('year, month', this.year, this.month)
    },
    initData () {
      let diaries = this.storage.load()
      // console.log('diaries', diaries)
      let afterYear = this.filterDataByYear(diaries)
      let afterMonth = this.filterDataByMonth(afterYear)
      // console.log('afterMonth', afterMonth)
      this.diaries = afterMonth.reverse()
    },
    filterDataByYear (diaries) {
      return diaries.filter(diary => {
        return diary.date[0] == this.year
      })
    },
    filterDataByMonth (diaries) {
      return diaries.filter(diary => {
        return diary.date[1] == this.month
      })
    },
    filterDataByDay (diaries) {
      return diaries.filter(diary => {
        return diary.date[2] == this.day
      })
    }
  },
  created () {
    this.initDate()
    this.initData()
  }
}
</script>

<style lang="stylus" scoped>
.month
  height 100%
  background-color #fafafa
  .header
    display flex
    align-items center
    height 1rem
    padding-top constant(safe-area-inset-top)
    padding-top env(safe-area-inset-top)
    img
      height .3rem
      margin-left .35rem

  
.date
  position relative
  text-align center
  // bottom .35rem
  bottom .4rem
  color #2D2D2D
  font-size 18px
  font-family Helvetica

.card-wrapper
  padding-left 5%
  padding-bottom .5rem
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
