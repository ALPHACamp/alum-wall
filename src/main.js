import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.config.productionTip = false
Vue.prototype.$log = console.log

new Vue({
  render: h => h(App)
}).$mount('#app')
