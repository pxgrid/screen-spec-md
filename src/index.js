/**
 * 各ディレクトリ階層で目次となるページ
 * TODO: {directory}/index.mdがない場合に自動生成
 */
import '@babel/polyfill'

import Vue from 'vue'
import store from './store'
import Index from './components/Index.vue'

const storeInstance = store()
Vue.config.productionTip = false

storeInstance.dispatch('fetchTree').then(() => {
  new Vue({
    el: '#app',
    store: storeInstance,
    render: h => h(Index),
  })
})
