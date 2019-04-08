import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import './assets/styles/rem.css'
import './assets/styles/iconfont/iconfont.css'
import fastClick from 'fastclick'

fastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.store = (function(){
  return {
    set (key, value) {
      localStorage[key] = JSON.stringify(value)
    },
    get (key) {
      if (!localStorage[key]) {
        return
      } else {
        return JSON.parse(localStorage[key])
      }
    }
  }
})()

Vue.prototype.storage = (function(){
  return {
    save: function(array) {
      var s = JSON.stringify(array)
      localStorage.diaries = s
    },
    load: function() {
      var s
      if(!localStorage.diaries) {
        s = JSON.stringify([])
      } else {
        s = localStorage.diaries
      }
      return JSON.parse(s)
    }
 }
})()

Vue.prototype.showToast = function (txt) {
  const toast = this.$createToast({
    time: 1000,
    txt,
    type: 'warn'
  })
  toast.show()
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
