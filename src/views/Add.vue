<template>
  <div class="add">

    <div class="header">
      <span class="cancel" @click="goBack">取消</span>
      <div class="date-select" @click="showDatePicker">
        {{ date[0] + '/' + date[1] + '/' + date[2] }}
      </div>
      <span class="save" @click="saveDiary">保存</span>
    </div>

    <div class="diary-content">
      <div class="title">
        <input type="text" v-model="inputTitle" maxlength="16" placeholder="Title">
      </div>
      <textarea
        class="main"
        @input="autosize"
        placeholder="
        记录一些有意思的事情，比如今天遇到一个笑话内容（下次说给女朋友听）、美味收获、电影观后感、或者对某个人的评价录一些有意思的有收获的事情，自己虚构的小说、自己想到一些有哲理的话、或者想看的书或者电影、也可以是一个亿的小目标，人生记录一些有意义的经验就好！记录一些生活的画面，
        去年的今天前年的今天都能历历在目，你成长了，你的人生就不一样了！
        开始你的第一篇日记吧
        "
        v-model="inputContent"
      >
      </textarea>
    </div>

    <div class="option-bar">
      <i class="iconfont" :class="weather" @click="showPopup"></i>
      <i class="cubeic-select"></i>
    </div>

    <cube-popup
      type="my-popup"
      :position="'bottom'"
      :mask="true"
      ref="weather"
      :maskClosable="true"
    >
      <div class="weather-icons">
        <ul>
          <li v-for="(weather, index) in weathers" :key="index" @click="handleWeatherClick(weather)">
            <i class="iconfont" :class="weather.icon"></i> <span>{{ weather.title }}</span>
          </li>
        </ul>
      </div>
    </cube-popup>

  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
export default {
  data () {
    return {
      // todos: 更改 icon 的class
      weathers: [
        {icon: 'icon-qingtian', title: '晴'},
        {icon: 'icon-feng', title: '风'},
        {icon: 'icon-yin', title: '阴'},
        {icon: 'icon-xiaoyu', title: '小雨'},
        {icon: 'icon-dayu', title: '大雨'},
        {icon: 'icon-xue', title: '雪'},
        {icon: 'icon-dian', title: '闪电'},
        {icon: 'icon-wu', title: '雾'}
      ],
      inputTitle: '',
      inputContent: '',
      weather: 'icon-qingtian',
      date: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    showPopup() {
      this.$refs.weather.show()
    },
    autosize (e) {
      let self = e.target
      self.style.height = 'auto';
      self.style.height = (self.scrollHeight) + 'px';
    },
    showDatePicker () {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          min: new Date(2018, 7, 8),
          max: new Date(2020, 9, 20),
          format: {
            year: 'YYYY年',
            month: 'MM月',
            date: 'DD日'
          },
          value: new Date(),
          onSelect: this.selectHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle (date, selectedVal, selectedText) {
      this.$set(this.date, 0, selectedVal[0])
      this.$set(this.date, 1, selectedVal[1])
      this.$set(this.date, 2, selectedVal[2])
    },
    handleWeatherClick (weather) {
      this.weather = weather.icon
      console.log('weather', this.weather)
      this.$refs.weather.hide()
    },
    isAllDataValid () {
      if (!this.inputTitle) {
        // console.log('请输入标题')
        this.showToast('请输入标题')
        return false
      } else if (!this.inputContent) {
        // console.log('请输入日记内容')
        this.showToast('请输入日记内容')
        return false
      } else if (!this.weather) {
        this.showToast('请选择天气')
        return false
      } else if (!this.date) {
        this.showToast('请选择日期')
        return false
      } else {
        return true
      }
    },
    saveDiary () {
      // console.log('save')
      let ts = Date.now()
      let flag = this.isAllDataValid()
      if (flag) {
        console.log('get')
        let ts = Date.now()
        let diaries = this.storage.load()
        let diary = this.createDiary(
          ts,
          this.inputTitle,
          this.inputContent,
          this.weather,
          this.date
        )
        diaries.push(diary)
        this.storage.save(diaries)
        this.showToast('保存成功')
        setTimeout(() => {
          this.$router.push({
            name: 'home'
          })
        }, 500)
      }
    },
    getDateArr (d) {
      // let oDate = new Date()
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      let date = d.getDate()
      return [year, month, date]
    },
    createDiary (ts, title, content, weather, date) {
      return {
        ts,
        title,
        content,
        weather,
        date
      }
    },
    initDate () {
      // 判断一下从哪个页面过来
      // home -> date = new Date()
      // date -> date = date from datePage
      let from = this.store.get('addFrom')
      if (from === 'home') {

        let d = new Date()
        this.date = this.getDateArr(d)
        // console.log('date', this.date)

      } else {

        if (this.store.get('dateFromDate')) {
          let d = this.store.get('dateFromDate')
          let oDate = new Date(d)
          this.date = this.getDateArr(oDate)
          console.log('date', this.date)
        } else {
          let d = new Date()
          this.date = this.getDateArr(d)
          // console.log('date', this.date)
        }

      }
    }
  },
  created () {
    console.log('this.addFrom', this.store.get('addFrom'))
    this.initDate()
  }
}
</script>

<style lang="stylus" scoped>
.add
  position relative
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
  .header
    display flex
    height 1rem
    background-color #fff
    align-items center
    justify-content space-between
    padding-top constant(safe-area-inset-top)
    padding-top env(safe-area-inset-top)
    padding-left .4rem
    padding-right .4rem
    box-shadow 0 8px 16px 0 rgba(226,226,226,0.30)
    .date-select
      display flex
      align-items center
      justify-content center
      width 40%
      height .415rem
      font-size 14px
      border-radius 15px
      border 1px solid #DEDEDE

.option-bar
  position absolute
  display flex
  align-items center
  justify-content space-between
  height .7rem
  width 100%
  bottom 0
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  box-shadow 0 -8px 16px 0 rgba(227,227,227,0.30)
  i
    font-size 26px
    margin-left .345rem
  .cubeic-select
    font-size 26px
    margin-right .345rem
    font-weight 800

.diary-content
  .title
    position relative
    top .05rem
    display flex
    align-items center
    justify-content center
    height .95rem
    input
      width 100%
      text-align center
      font-family PingFangSC-Semibold
      font-size 18px
      color #2D2D2D
    ::-moz-placeholder { color: #D7D7D7; }
    ::-webkit-input-placeholder { color:#D7D7D7; }
    :-ms-input-placeholder { color:#D7D7D7; }
  .main
    display block
    min-height 5rem
    // background-color lightgrey
    // padding 0 .3rem 0 .3rem
    // text-indent: 2em
    width 90%
    margin 0 auto
    line-height .4rem
    color #d7d7d7
    font-family PingFang-SC-Medium
    font-size 14px
    outline none
    border none
    resize none
    padding-bottom 1rem
    color #000
  ::-moz-placeholder { color: #D7D7D7; }
  ::-webkit-input-placeholder { color:#D7D7D7; }
  :-ms-input-placeholder { color:#D7D7D7; }

.cube-popup
  .cube-popup-container
    .cube-popup-content
      .weather-icons
        box-sizing border-box
        display flex
        // align-items center
        justify-content center
        width 100%
        height 2.45rem
        padding .15rem 0 .2rem 0
        // background-color #eee
        background-color #fff
        ul
          display flex
          flex-flow row wrap
          height 100%
          width 80%
          // background-color lightgrey
          li
            flex 0 0 25%
            height 50%
            display flex
            flex-direction column
            align-items center
            justify-content space-around
            i
              font-size 24px
              margin-top .125rem
              color #979797
            span
              font-size 13px
              color #979797
</style>
