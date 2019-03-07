/**
 * 画面画像を持たないドキュメント中心のページ
 */
import './assets/template.scss'
import '@babel/polyfill'

import Vue from 'vue'
import store from './store'
import Doc from './components/Doc.vue'

const storeInstance = store()
Vue.config.productionTip = false

storeInstance.dispatch('fetchTree').then(() => {
  new Vue({
    el: '#app',
    store: storeInstance,
    render: h => h(Doc),
  })
})
