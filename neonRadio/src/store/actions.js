import {
  RECEIVE_USERINFO, 
  RECEIVE_SONGINFO,
  RECEIVE_UPSONGPLAYIDLIST,
  RECEIVE_UPSONGPLAYINDEX
} from './mutation-types'

import {
  regSongInfo
} from '../service'

export default {
  //接受用户信息与cookie
  getUserinfo({commit}, {userInfo,cookie }) {
    commit(RECEIVE_USERINFO,{userInfo, cookie })
  },
  //获取歌曲详情信息
  async getSongInfo({commit}, {ids}) {
    let result = await regSongInfo({ids})
    commit(RECEIVE_SONGINFO,{songInfo:result.songs[0]})
  },
  //更新当前播放列表id 
  upSongPlayIdList ({commit}, {ids}) {
    commit(RECEIVE_UPSONGPLAYIDLIST,{ids})
  },
  //更新当前播放歌曲在列表里的下标
  upSongPlayIndex ({commit}, {index}) {
    commit(RECEIVE_UPSONGPLAYINDEX,{index})
  },
}