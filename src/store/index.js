import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './home'
import search from './search'
import detail  from './detail'
import shopcart from './shopcart'
import user from './uesr'
import trade from './trade'

export default new Vuex.Store({
   //模块：把小仓库进行合并变为大仓库
   modules: {
     home,
     search,
     detail,
     shopcart,
     user,
     trade
   },
 });