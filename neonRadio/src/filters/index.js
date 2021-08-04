import Vue from 'vue'
import moment from 'moment' //引入时间戳依赖包

//定义时间戳转换器
Vue.filter('dateString', function (value, format) {
  return moment(value).format(format || 'YYYY.MM.DD')
})

//定义播放/评论/分享数量过滤器
Vue.filter('filterVolume', function (volume) {
  let vol = volume
  if (vol >= 100000000) {
    vol = (vol / 100000000.0).toFixed(1) + '亿'
  } else if (vol >= 10000) {
    vol = (vol / 10000.0).toFixed(1) + '万'
  }
  return vol
})