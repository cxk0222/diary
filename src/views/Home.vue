<template>
  <div class="home">

    <div class="header">
      <img src="../assets/image/date.png" class="date" @click="goToDate">
      <img src="../assets/image/search.png" class="search" @click="goToSearch">
    </div>

    <div class="year-wrapper">
      <span class="year" @click="showDatePicker">{{ showYear }}</span>
      <i class="cubeic-select icon-down" @click="showDatePicker"></i>
    </div>

    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(image, index) in images" :key="index">

        <div class="card" @click.stop="goToMonth(image)">
          <div class="card-img" :class="image.img"></div>
          <div class="card-desc">
            <div class="left">
              <p class="month-num">{{ image.month }}</p>
              <p class="month-en">{{ image.monthEn }}</p>
            </div>
            <div class="right">
              <div class="progress-out">
                <div class="progress-in" :style="getProgress(image)"></div>
              </div>
              <!-- <p class="text">本月写日记 1 天</p> -->
              <p class="text">本月写日记 {{ getWriteDays(image) }} 天</p>
            </div>
          </div>
        </div>

      </swiper-slide>
    </swiper>

    <!-- <div class="card">
      <div class="card-img"></div>
      <div class="card-desc">
        <div class="left">
          <p class="month-num">12</p>
          <p class="month-en">DEC</p>
        </div>
        <div class="right">
          <div class="progress-out">
            <div class="progress-in" :style="progress"></div>
          </div>
          <p class="text">本月写日记 1 天</p>
        </div>
      </div>
    </div> -->

    <div class="tab-bar">
      <img src="../assets/image/add.png" class="add" @click="goToAdd">
      <img src="../assets/image/my.png" class="my" @click="goToMy">
    </div>

  </div>
</template>

<script>
// 点击月份卡片的时候判断当月是否有日记
// 有则进入 无则 toast 暂无日记

// {
//   '2019/2/15': [{}, {}, ...],
//   '2019/2/16': [{}, {}, ...],
// }
// len = Object.keys(dateArr)

// 1. 总天数 = 先算出该月一共有多少天
// 2. filterDiaries 
// 3. 日记天数 = 算出该月一共写了多少天的日记
// 4. progress = 日记天数 / 总天数

// 会用到数组去重
// 拼接字符串 '2019/1/15'
// ['2019/1/15', '2019/1/16', ...]
// unique = [... new Set(dateArr)]
// writeDays = unique.length
// 拿到的那个 length 就是 日记天数

// 点击月份，如果该月份没有日记则跳到 add 页面

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      date: '',
      month: '',
      images: [
        {img: 'img1', month: '01', monthEn: 'Jan'},
        {img: 'img2', month: '02', monthEn: 'Feb'},
        {img: 'img3', month: '03', monthEn: 'Mar'},
        {img: 'img4', month: '04', monthEn: 'Apr'},
        {img: 'img5', month: '05', monthEn: 'May'},
        {img: 'img6', month: '06', monthEn: 'Jun'},
        {img: 'img7', month: '07', monthEn: 'Jul'},
        {img: 'img8', month: '08', monthEn: 'Aug'},
        {img: 'img9', month: '09', monthEn: 'Sep'},
        {img: 'img10', month: '10', monthEn: 'Oct'},
        {img: 'img11', month: '11', monthEn: 'Nov'},
        {img: 'img12', month: '12', monthEn: 'Dec'}
      ],
      progress: {
        width: '50%'
      },
      swiperOption: {
        slidesPerView: 1.2,
        spaceBetween: 15,
        centeredSlides: true,
        // slidesPerView: 'auto'
        // navigation: {
        //   prevEl: '.prev',
        //   nextEl: '.next'
        // }
      }
    }
  },
  methods: {
    add () {
      let num = parseFloat(this.progress.width)
      num += 3.22
      this.progress.width = `${num}%`
    },
    fixNum (num, n) {
      let fix = num.toFixed(n)
      return parseFloat(fix)
    },
    getProgress (image) {
      let year = this.date.getFullYear()
      let month = parseInt(image.month)
      let days = this.getDaysInOneMonth(year, month)
      let writeDays = this.getWriteDays(image)
      let radio = this.fixNum( ( (writeDays / days) * 100 ), 2 )
      return { width: `${radio}%` }
    },
    getWriteDays (image) {
      let year = this.date.getFullYear()
      let month = parseInt(image.month)
      let days = this.getDaysInOneMonth(year, month)

      let diaries = this.storage.load()
      let afterYear = this.filterDataByYear(diaries, year)
      let afterMonth = this.filterDataByMonth(afterYear, month)
      let count = 0
      for (let i = 1; i <= days; i++) {
        let oneDayDiaries = this.filterDataByDay(afterMonth, i)
        if (oneDayDiaries.length > 0) {
          count += 1
        }
      }
      return count
    },
    getDaysInOneMonth (year, month) {
      month = parseInt(month, 10)
      var date = new Date(year, month, 0)
      return date.getDate()
    },
    filterDataByYear (diaries, year) {
      return diaries.filter(diary => {
        return diary.date[0] == year
      })
    },
    filterDataByMonth (diaries, month) {
      return diaries.filter(diary => {
        return diary.date[1] == month
      })
    },
    filterDataByDay (diaries, day) {
      return diaries.filter(diary => {
        return diary.date[2] == day
      })
    },
    goToSearch () {
      this.$router.push({
        name: 'search'
      })
    },
    goToMonth (image) {
      let writeDays = this.getWriteDays(image)
      if (writeDays === 0) {
        this.store.set('addFrom', 'home')
        this.showToast('该月暂无日记')
        setTimeout(() => {
          this.$router.push({
            name: 'add'
          })
        }, 500)
      } else {
        let year = this.date.getFullYear()
        let month = image.month
        let dateText = `${year}/${month}/01`
        this.store.set('dateText', dateText)
        this.$router.push({
          name: 'month'
        })
      }

    },
    goToDate () {
      this.store.set('date', this.date)
      this.$router.push({
        name: 'date'
      })
    },
    goToAdd () {
      this.store.set('addFrom', 'home')
      this.$router.push({
        name: 'add'
      })
    },
    goToMy () {
      this.$router.push({
        name: 'my'
      })
    },
    showDatePicker () {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          min: new Date(2018, 7, 8),
          max: new Date(2022, 9, 20),
          startColumn: 'year',
          columnCount: 1,
          format: {
            year: 'YYYY年'
          },
          value: new Date(),
          onSelect: this.selectHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle (date, selectedVal, selectedText) {
      this.date = date
    },
    initDate () {
      let date = new Date()
      this.date = date
      this.month = date.getMonth()
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    showYear () {
      return this.date.getFullYear()
    }
  },
  mounted () {
    // index speed
    this.swiper.slideTo(this.month, 0, false)
  },
  created () {
    this.initDate()
  }
}
</script>

<style lang="stylus" scoped>
.home
  // min-height 100vh
  min-height 100vh
.header
  display flex
  height 1rem
  align-items center
  justify-content space-between
  padding-top constant(safe-area-inset-top)
  padding-top env(safe-area-inset-top)
  padding-left .4rem
  padding-right .4rem
  img
    height .4rem

.year-wrapper
  display flex
  align-items center
  justify-content center
  .year
    font-size 21px
    font-family Helvetica-Bold
    color #2D2D2D
  .icon-down
    position relative
    left .1rem

.card
  width 100%
  height 7.2rem
  border-radius 16px
  background-color #fff
  box-shadow 0 10px 20px 0 rgba(186,186,186,0.30)
  .card-img
    height 72%
    background-size 100% 100%
  .img1
    background-image url(../assets/image/1.png)
  .img2
    background-image url(../assets/image/2.png)
  .img3
    background-image url(../assets/image/3.png)
  .img4
    background-image url(../assets/image/4.png)
  .img5
    background-image url(../assets/image/5.png)
  .img6
    background-image url(../assets/image/6.png)
  .img7
    background-image url(../assets/image/7.png)
  .img8
    background-image url(../assets/image/8.png)
  .img9
    background-image url(../assets/image/9.png)
  .img10
    background-image url(../assets/image/10.png)
  .img11
    background-image url(../assets/image/11.png)
  .img12
    background-image url(../assets/image/12.png)
  .card-desc
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    height 28%
    padding .3rem .5rem .3rem .75rem
    .left
      .month-num
        font-family Helvetica
        font-size 45px
        margin-bottom 2px
      .month-en
        font-size 23px
        font-family Helvetica-Light
        color #2D2D2D
    .right
      display flex
      height 50%
      flex-direction column
      justify-content flex-end
      .text
        font-family PingFang-SC-Bold
        text-align right
        color #ccc
        font-size 13px
    .progress-out
      width 1.75rem
      height 4px
      background-color #E1E1E1
      border-radius 2px
      margin-bottom .2rem
      .progress-in
        width 0%
        height 100%
        float right
        border-radius 2px
        background-color #E5384F

.tab-bar
  position fixed
  font-family PingFang-SC-Medium
  bottom 10px
  left 0
  right 0
  width 100%
  z-index 100
  height 50px
  background transparent
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  img
    height 45px
    width 45px
  .add
    margin-left 50%
    transform translateX(-50%)
  .my
    float right
    margin-right .5rem

</style>
