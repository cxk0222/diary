<template>
  <div class="date">

    <div class="header">
      <img src="../assets/image/back.png" class="back" @click="goBack">
      <div class="year">
        <span @click.stop="showDatePicker">{{ showYear }} </span>
        <i class="cubeic-select" @click.stop="showDatePicker"></i>
      </div>
      <img src="../assets/image/search.png" class="search" @click="goToSearch">
    </div>

    <!-- <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <swiper-slide v-for="(item, index) in items" :key="index">
        <app-calendar
          v-on:choseDay="clickDay"
          v-on:changeMonth="changeDate"
        ></app-calendar>
      </swiper-slide>
    </swiper> -->

    <my-calendar @chooseDay="getChooseDay" class="my-calendar" :date="date"></my-calendar>

  </div>
</template>

<script>
import MyCalendar from '../components/Calendar'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import AppButton from '../components/AppButton'
export default {
  components: {
    MyCalendar,
    swiper,
    swiperSlide,
    AppButton
  },
  data () {
    return {
      date: '',
      chooseDay: '',
      swiperOption: {
        slidesPerView: 1.25,
        spaceBetween: 22,
        centeredSlides: true
        // slidesPerView: 'auto'
        // navigation: {
        //   prevEl: '',
        //   nextEl: ''
        // }
      }
    }
  },
  computed: {
    showYear () {
      return this.date.getFullYear()
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goToSearch () {
      this.$router.push({
        name: 'search'
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
            // month: 'MM月',
            // date: 'DD日'
          },
          value: new Date(),
          onSelect: this.selectHandle
        })
      }
      this.datePicker.show()
    },
    removeClassAll (className) {
      let elems = document.querySelectorAll('.' + className)
      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove(className)
      }
    },
    selectHandle (date, selectedVal, selectedText) {
      // console.log('date', date)
      this.removeClassAll('click')
      this.removeClassAll('btn-click')
      this.chooseDay = ''
      this.date = date
      // console.log('this.chooseDay', this.chooseDay)
      // console.log('this.date', this.date)

    },
    getChooseDay (chooseDay) {
      this.store.set('addFrom', 'date')
      this.store.set('dateFromDate', chooseDay)
      this.chooseDay = chooseDay

      this.$router.push({
        name: 'add'
      })

    },
    initDate () {
      let d = this.store.get('date')
      this.date = new Date(d)
      // console.log('date', this.date)
    }
  },
  created () {
    this.initDate()
  }
}
</script>

<style lang="stylus" scoped>
.date
  @media all
    min-height 620px
  @media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2)
    min-height 568px
  @media only screen and (min-device-width: 375px)and (-webkit-min-device-pixel-ratio: 2)
    min-height 667px
  @media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3)
    min-height 812px
  @media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3)
    min-height 736px
  background-color #eee
  .header
    position relative
    display flex
    height 1rem
    align-items center
    justify-content space-between
    padding-top constant(safe-area-inset-top)
    padding-top env(safe-area-inset-top)
    padding-left .4rem
    padding-right .4rem
    .back
      height .25rem
    .search
      height .4rem
    .year
      position absolute
      left 50%
      transform translateX(-45%)
      margin-top .1rem
      span
        font-family Helvetica-Bold
        font-size 21px
      i
        font-weight 600

</style>
