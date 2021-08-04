import ajax from './ajax'
const BASE_URL = '/api'

//1、国家编码列表
export const reqCountries = () => ajax(`${BASE_URL}/countries/code/list`)

//2、发送验证码
export const reqCaptchaSent = ({phone}) => ajax(`${BASE_URL}/captcha/sent`,{phone})

//3、验证验证码
export const reqCaptchaVerify = ({phone, captcha}) => ajax(`${BASE_URL}/captcha/verify`,{phone, captcha})

//4. 手机密码登录
export const reqLoginCellphone = ({phone, password}) => ajax(`${BASE_URL}/login/cellphone`,{phone, password})

//5. 修改密码
export const reqRegisterCellphone = ({captcha, phone, password, nickname}) => ajax(`${BASE_URL}/register/cellphone`,{captcha, phone, password, nickname})

//6. 检测手机号码是否已注册
export const reqcellphoneCheck = ({phone}) => ajax(`${BASE_URL}/cellphone/existence/check`,{phone})

//7. 请求banner
export const reqBanner = () => ajax(`${BASE_URL}/banner?type=1`)

//8. 请求推荐歌单
export const reqRecommend = () => ajax(`${BASE_URL}/recommend/resource`)

//9. 请求热门歌单
export const regHighquality = () => ajax(`${BASE_URL}/top/playlist/highquality?limit=9`)

//10. 请求流行歌曲列表
export const regPopularSongList = async ({type}) => {
  let reslut = await ajax(`${BASE_URL}/top/song`,{type})
  let arr = []
  while(arr.length != 12) {
    let redom = Math.floor(Math.random()*(100))
    if(!arr.find ( elem => reslut.data[redom] == elem))  arr.push(reslut.data[redom])
  }
  reslut.data = arr
  return reslut
}

//11. 请求新歌 result
export const regNewsong = () => ajax(`${BASE_URL}/personalized/newsong`)

//12. 请求新碟 
export const regAlbumNew = () => ajax(`${BASE_URL}/album/new?limit=9`)

//13. 请求新专辑 albums
export const regAlbumNewest = () => ajax(`${BASE_URL}/album/newest`)

//14. 请求歌曲评论
export const regCommentMusic = ({id, limit}) => ajax(`${BASE_URL}/comment/music`, {id, limit})

//15.请求专辑内容
export const regAlbum = ({id}) => ajax(`${BASE_URL}/album`, {id})

//16.请求专辑动态信息
export const regAlbumDetail = ({id}) => ajax(`${BASE_URL}/album/detail/dynamic`, {id})

//17.收藏/取消收藏专辑
export const regAlbumSub = ({t}) => ajax(`${BASE_URL}/album/sub`, {t})

//18.专辑评论
export const regCommentAlbum = ({id, limit, offset, before}) => ajax(`${BASE_URL}/comment/album`, {id, limit, offset, before})

//19.请求歌单内容
export const regSongSheet = ({id}) => ajax(`${BASE_URL}/playlist/detail`, {id})

//20.请求歌单动态信息
export const regSongSheetDetail = ({id}) => ajax(`${BASE_URL}/playlist/detail/dynamic`, {id})

//21.根据id请求歌曲详情信息
export const regSongInfo = ({ids}) => ajax(`${BASE_URL}/song/detail`, {ids})
