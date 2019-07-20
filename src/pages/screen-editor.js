/**
 * 画面画像のハイライトをCanvasで編集するページ
 */
import '../assets/common.scss'
import '../assets/template.scss'

import '@babel/polyfill'

import Vue from 'vue'
import store from '../store'
import ScreenEditor from '../components/Pages/ScreenEditor.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(ScreenEditor),
})
