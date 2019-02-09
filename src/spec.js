import './assets/template.scss'
import '@babel/polyfill'

import Vue from 'vue'
import store from './store'
import Spec from './components/Spec.vue'

const storeInstance = store()
Vue.config.productionTip = false

storeInstance.dispatch('fetchTree').then(() => {
  new Vue({
    el: '#app',
    store: storeInstance,
    render: h => h(Spec),
  })
})
