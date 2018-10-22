import './assets/template.scss'

import Vue from 'vue'
import TheHeader from './components/TheHeader.vue'
import Screen from './components/Spec/Screen.vue'
import Separator from './components/Spec/Separator.vue'
import Document from './components/Spec/Document.vue'

window.TheHeader = Vue.component('TheHeader', TheHeader)
window.Screen = Vue.component('Screen', Screen)
window.Separator = Vue.component('Separator', Separator)
window.Document = Vue.component('Document', Document)
