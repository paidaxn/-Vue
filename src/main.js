import Vue from 'vue'
import App from './App.vue'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import router from '@/router'
import store from "@/store"
import 'swiper/css/swiper.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Carsousel from "@/components/Carousel";
import '@/mock/mockServe'
import * as Api from '@/api'
import VueLazyLoad from 'vue-lazyload'
import "@/plugins/validate"
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
Vue.use(ElementUI);
Vue.use(VueLazyLoad)
import {reqCategoryList} from '@/api'
reqCategoryList()
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$Api = Api
  },
  router,
  store
}).$mount('#app')
