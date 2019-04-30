/**
 * 画面画像を持たないドキュメント中心のページ
 */
import './assets/template.scss'
import '@babel/polyfill'

import Vue from 'vue'
import store from './store'
import types from './store/types'
import Doc from './components/Doc.vue'

const storeInstance = store()
Vue.config.productionTip = false

storeInstance.dispatch(types.FETCH_TREE_DATA).then(() => {
  new Vue({
    el: '#app',
    store: storeInstance,
    render: h => h(Doc),
  })
})
