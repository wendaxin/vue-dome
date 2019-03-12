// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import './assets/css/global.css'
import 'mint-ui/lib/style.css'
import VuePreview from 'vue-preview'

Vue.config.productionTip = false

// 图片预览插件
Vue.use(VuePreview)

// 全局组件
import Mylist from '@/components/common/MyList'
import MylistChild from '@/components/common/MyListChild'
import NevBar from '@/components/common/NevBar'
import comment from '@/components/common/comment'
import MyLunbo from '@/components/common/MyLunbo'

Vue.component(Mylist.name,Mylist)
Vue.component(MylistChild.name,MylistChild)
Vue.component(NevBar.name,NevBar)
Vue.component(comment.name,comment)
Vue.component(MyLunbo.name,MyLunbo)

// 定义moment全局日期过滤器
import Moment from  'moment'
Moment.locale("zh-cn")

Vue.filter('convertTime',function (data,formatStr){
  return Moment(data).format(formatStr)
})
Vue.filter('fromNowTime',function (data){
  return Moment(data).fromNow()
})

// 配置mint-ui
Vue.use(MintUI)

// 配置axios
import Axios from 'axios'
Axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5c7a28f4362090713fed91fa/api/'
Vue.prototype.$axios = Axios

// axios拦截器
Axios.interceptors.request.use(config=>{
  MintUI.Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return config
})
Axios.interceptors.response.use(response=>{
  MintUI.Indicator.close()
  return response
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
