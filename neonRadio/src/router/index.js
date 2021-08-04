import Vue from 'vue'
import Router from 'vue-router'

const LoginPage = () => import('pages/loginPage/LoginPage')
const Login = () => import('pages/loginPage/childrenPages/login/Login')
const FindIndex = () => import('pages/FindIndex/FindIndex')
const Album = () => import('pages/album/Album')
const SongSheet = () => import('pages/songSheet/SongSheet')
const InfoDesc = () => import('pages/infoDesc/InfoDesc')
const SongPlayPage = () => import('pages/songPlayPage/SongPlayPage')
const SongCommentPage = () => import('pages/songPlayPage/childrenPages/songCommentPage/SongCommentPage')



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/findIndex',
      name: 'main',
    },
    //登录主页面
    {
      path: '/loginPage',
      component: LoginPage,
      name: 'LoginPage',
    },
    //登录操作页面
    {
      path: '/loginPage/login',
      component: Login,
      name: 'Login',
    },
    //app发现主页面
    {
      path: '/findIndex',
      component: FindIndex,
      name: 'FindIndex',
    },
    //专辑页面
    {
      path: '/album',
      component: Album,
      name: 'album',
    },
    //专辑详情页
    {
      path: '/album/albumdesc',
      component: InfoDesc,
      name: 'albumDesc',  
    },
    //歌单页面
    {
      path: '/songsheet',
      component: SongSheet,
      name: 'songsheet',
    },
    //歌单详情页
    {
      path: '/songsheet/songdesc',
      component: InfoDesc,
      name: 'songDesc',  
    },
    //歌曲播放页面
    {
      path: '/songplaypage',
      component: SongPlayPage,
      name: 'SongPlayPage',  
    },
    //歌曲评论页面
    {
      path: '/songcommentpage',
      component: SongCommentPage,
      name: 'SongCommentPage',  
    },
  ],
  mode: 'history'
})
