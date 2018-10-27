import './assets/template.scss'
import '@babel/polyfill'

import Vue from 'vue'
import Spec from './components/Spec.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(Spec),
})
