<template>
  <swiper :options="swiperOption" ref="swiperCal">

    <swiper-slide v-for="(allDays, index) in allYearDateDays" :key="index">

      <div class="calendar">
        <div class="header">
          <span>{{ index + 1 }}月</span>
        </div>

        <ul class="main">

          <!-- 日期头 -->

          <!-- <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li> -->

          <!-- <li v-for="(day, index) in allDays" :key="index">
            <div @click.stop="handleDayClick($event, day)"> {{ showDay(day) }} </div>
          </li> -->

          <li v-for="(day, i) in allDays" :key="i">
            <div @click.stop="handleDayClick($event, day, index)"> {{ showDay(day) }} </div>
          </li>

          <!-- <li>
            <div>1</div>
          </li>
          <li>
            <div>2</div>
          </li>
          <li>
            <div>3</div>
          </li>
          <li>
            <div>4</div>
          </li>
          <li>
            <div>5</div>
          </li>
          <li>
            <div>6</div>
          </li>
          <li>
            <div>7</div>
          </li>

          <li>
            <div>1</div>
          </li>
          <li>
            <div>2</div>
          </li>
          <li>
            <div>3</div>
          </li>
          <li>
            <div>4</div>
          </li>
          <li>
            <div>5</div>
          </li>
          <li>
            <div>6</div>
          </li>
          <li>
            <div>7</div>
          </li>

          <li>
            <div>1</div>
          </li>
          <li>
            <div>2</div>
          </li>
          <li>
            <div>3</div>
          </li>
          <li>
            <div>4</div>
          </li>
          <li>
            <div>5</div>
          </li>
          <li>
            <div>6</div>
          </li>
          <li>
            <div>7</div>
          </li>

          <li>
            <div>1</div>
          </li>
          <li>
            <div>2</div>
          </li>
          <li>
            <div>3</div>
          </li>
          <li>
            <div>4</div>
          </li>
          <li>
            <div>5</div>
          </li>
          <li>
            <div>6</div>
          </li>
          <li>
            <div>7</div>
          </li>

          <li>
            <div>1</div>
          </li>
          <li>
            <div>2</div>
          </li>
          <li>
            <div>3</div>
          </li>
          <li>
            <div>4</div>
          </li>
          <li>
            <div>5</div>
          </li>
          <li>
            <div>6</div>
          </li>
          <li>
            <div>7</div>
          </li> -->

        </ul>

        <div class="footer">
          <div class="btn" @click="$emit('chooseDay', chooseDay)" ref="btn">
            从选中的日期中写
          </div>
        </div>

      </div>

    </swiper-slide>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  data () {
    return {
      firstDay: '',
      lastDay: '',
      allDays: '',
      chooseDay: '',

      // 全年所有月份的日期对象
      allYearDate: '',
      allYearDateDays: '',
      // swiper 的配置
      swiperOption: {
        slidesPerView: 1.2,
        spaceBetween: 15,
        centeredSlides: true
      }
    }
  },
  methods: {
    showDay (day) {
      // return this.toFix(day.date.getDate())
      if (day.type === 'cur') {
        return this.toFix(day.date.getDate())
      } else {
        // 不显示 之前 和 之后 的日期
        return ''
      }
    },
    showMonth (index) {
      let month = index + 1
      return this.toFix(month)
    },
    removeClassAll (className) {
      let elems = document.querySelectorAll('.' + className)
      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove(className)
      }
    },
    handleDayClick (event, day, index) {
      let self = event.target
      let text = self.innerText
      console.log('index', index)
      if (text) {
        // removeClassAll
        this.removeClassAll('click')
        this.removeClassAll('btn-click')
        self.classList.add('click')
        this.$refs.btn[index].classList.add('btn-click')
        this.chooseDay = day.date
      }

    },
    formatDate (date) {
      let y = date.getFullYear()
      let m = this.toFix(date.getMonth() + 1)
      let d = this.toFix(date.getDate())
      return `${y}/${m}/${d}`
    },
    toFix (n) {
      return (n + '').length === 1 ? ('0' + n + '') : (n + '')
    },
    getFirstDay (date) {
      let year = date.getFullYear()
      let month = date.getMonth()
      return new Date(year, month, 1)
    },
    getLastDay (date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month > 11) {
        month = 0
        year += 1
      }
      let newDate = new Date(year, month, 1)
      return new Date(newDate.getTime() - 1000 * 60 * 60 * 24)
    },
    getPreMonth (date) {
      let year = date.getFullYear()
      let month = date.getMonth() - 1
      if (month < 0) {
        month = 11
        year -= 1
      }
      return new Date(year, month, 1)
    },
    getNextMonth (date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month > 11) {
        month = 0
        year += 1
      }
      return new Date(year, month, 1)
    },
    getPreDays (firstDay) {
      let res = []
      let f = firstDay
      for (let i = f.getDay(); i > 0; i--) {
        let d = new Date( f.getTime() - (i * 24 * 60 * 60 * 1000) )
        res.push( {type: 'pre', date: d} )
      }
      return res
    },
    getCurDays (firstDay, lastDay) {
      let f = firstDay
      let l = lastDay
      let res = []
      for (let i = 0; i < l.getDate() - f.getDate() + 1; i++) {
        let d = new Date( f.getTime() + (i * 24 * 60 * 60 * 1000) )
        res.push( {type: 'cur', date: d} )
      }
      return res
    },
    getNextDays (lastDay) {
      let l = lastDay
      let res = []
      for (let i = 1; i < 7 - l.getDay(); i++) {
        let d = new Date( l.getTime() + (i * 24 * 60 * 60 * 1000) )
        res.push( {type: 'next', date: d} )
      }
      return res
    },
    getAllDays (first, last) {
      let p = this.getPreDays(first)
      let c = this.getCurDays(first, last)
      let n = this.getNextDays(last)
      return [...p, ...c, ...n]
    },
    getYearDate (date) {
      let y = date.getFullYear()
      let res = []
      for (let i = 0; i < 12; i++) {
        let d = new Date(y, i, 1)
        res.push(d)
      }
      return res
    },
    getYearDateDays (allYearDate) {
      let a = allYearDate
      let res = []
      a.forEach(date => {
        // console.log('date', date)
        let f = this.getFirstDay(date)
        let l = this.getLastDay(date)
        let all = this.getAllDays(f, l)
        res.push(all)
      })
      return res
    },
    initDate () {
      // let date = new Date()
      let date = this.date
      let allYearDate = this.getYearDate(date)
      console.log('allYearDate', allYearDate)
      this.allYearDateDays = this.getYearDateDays(allYearDate)
      console.log('all', this.allYearDateDays)
    }
  },
  watch: {
    date () {
      let date = this.date
      let allYearDate = this.getYearDate(date)
      this.allYearDateDays = this.getYearDateDays(allYearDate)
    }
  },
  created () {
    this.initDate()
  }
}
</script>

<style lang="stylus" scoped>
.calendar
  height 8rem
  width 100%
  margin 0 auto
  background-color #fff
  box-shadow 0 5px 20px 0 rgba(186,186,186,0.30)
  border-radius 16px
  .header
    display flex
    height 1.5rem
    justify-content center
    span
      font-family PingFangSC-Semibold
      font-size 26px
      margin-top .45rem
      color #2D2D2D
    // align-items center
    // background-color #eee
  .main
    display flex
    flex-wrap wrap
    background-color white
    height 4.5rem
    padding 0 .4rem 0 .4rem
    li
      // height .5rem
      font-family PingFangSC-Semibold
      flex 0 0 14.28%
      display flex
      align-items center
      justify-content center
      // outline 1px solid red
      div
        display flex
        align-items center
        justify-content center
        height .5rem
        width .5rem
        color #999999
        // border-radius 50%
        border-radius .5rem
        // border 1px solid blue
  .footer
    display flex
    height 2rem
    width 100%
    align-items flex-end
    justify-content center
    .btn
      display flex
      width 50%
      height .6rem
      margin-bottom .6rem
      align-items center
      justify-content center
      background-color #eee
      border-radius 27px
      opacity 0.15
      color #fff
      background-image linear-gradient(-90deg, #FF8A8A 0%, #FF4F66 100%)

.click
  box-shadow 0 0 0 1px #000

.btn-click
  opacity .5!important
</style>
