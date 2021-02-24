import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import vhCheck from 'vh-check'

vhCheck()

Vue.config.productionTip = false
Vue.prototype.$log = console.log

new Vue({
  render: h => h(App)
}).$mount('#app')
