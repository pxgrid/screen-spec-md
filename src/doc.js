/**
 * 画面画像を持たないドキュメント中心のページ
 */
import './assets/common.scss'
import './assets/template.scss'

import '@babel/polyfill'

import Vue from 'vue'
import store from './store'

import Doc from './components/Doc.vue'
import types from './store/types'
import editableTypes from './store/modules/editable/types'

const storeInstance = store()
Vue.config.productionTip = false

storeInstance.dispatch(types.FETCH_TREE_DATA).then(() => {
  storeInstance.commit(`editable/${editableTypes.INIT_PAGE}`)

  new Vue({
    el: '#app',
    store: storeInstance,
    render: h => h(Doc),
  })
})
