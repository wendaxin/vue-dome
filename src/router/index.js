import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import('@/components/Home/Home')
const Member = ()=> import('@/components/Member/Member')
const Search = ()=> import('@/components/Search/Search')
const Shopcart = ()=> import('@/components/Shopcart/Shopcart')
const NewsList = ()=> import('@/components/News/NewsList')
const NewsDetail = ()=> import('@/components/News/NewsDetail')
const PhotoList = ()=> import('@/components/PhotoList/PhotoList')
const Photodetail = ()=> import('@/components/PhotoList/Photodetail')
const Goodlist = ()=> import('@/components/Goodlist/Goodlist')
const Gooddetail = ()=> import('@/components/Goodlist/Gooddetail')
const Goodimgtext = ()=> import('@/components/Goodlist/Goodimgtext')
const Goodcomm = ()=> import('@/components/Goodlist/Goodcomm')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name:'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    {
      path: '/news/list',
      name: 'news.list',
      component: NewsList
    },
    {
      path: '/news/detail',
      name: 'news.detail',
      component: NewsDetail
    },
    {
      path: '/photo/list/:categoryId',
      name: 'photo.list',
      component: PhotoList
    },
    {
      path: '/photo/detail',
      name: 'photo.detail',
      component: Photodetail,
      props: (route)=>({query: route.query.id}),
    },
    {
      path: '/good/list',
      name: 'good.list',
      component: Goodlist
    },
    {
      path: '/good/detail',
      name: 'good.detail',
      component: Gooddetail
    },{
      path: '/good/imgtext',
      name: 'good.imgtext',
      component: Goodimgtext
    },{
      path: '/good/comm',
      name: 'good.comm',
      component: Goodcomm
    }
  ]
})
