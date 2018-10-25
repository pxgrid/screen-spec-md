import './assets/template.scss'
import '@babel/polyfill'

import Vue from 'vue'
import store from './store'
import ImageCanvas from './components/ImageCanvas.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(ImageCanvas),
})
