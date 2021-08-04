import {
  RECEIVE_USERINFO, 
  RECEIVE_SONGINFO,
  RECEIVE_UPSONGPLAYIDLIST,
  RECEIVE_UPSONGPLAYINDEX
} from './mutation-types'

export default {
  //接受用户信息与cookie
  [RECEIVE_USERINFO] (state, {userInfo,cookie}) {
    state.userInfo = userInfo
    state.cookie = cookie
  },
  //获取歌曲详情信息
  [RECEIVE_SONGINFO] (state, {songInfo}) {
    state.songPlayInfo = songInfo
  },
  //更新当前播放列表id 
  [RECEIVE_UPSONGPLAYIDLIST] (state, {ids}) {
    ids.forEach(id => {
      state.songPlayInfo.push(id)
    });
  },
  //更新当前播放歌曲在列表里的下标
  [RECEIVE_UPSONGPLAYINDEX] (state, {index}) {
    state.songPlayIndex = index
  },
}