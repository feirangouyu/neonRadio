import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './filters'

import 'lib-flexible' //引入rem设配模块
import MintUI from 'mint-ui' //引入MintUI
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import 'vue-audios/dist/vue-audios.css'; //引入vue-audios
import VueAudios from 'vue-audios';

Vue.use(VueAudios);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
