<template>
  <div class="song-play-page" v-if="songPlayInfo.name">
    <div>
      <!-- 头部 -->
      <page-header :name="songPlayInfo.name" share :auto="autoNames" />
      <!-- 歌曲图 -->
      <div class="cover">
        <img
          class="needle"
          :class="{ needleRotate: isPlay }"
          src="@/static/images/song/needle.png"
        />
        <div class="discContainer" :class="{ discAnimation: isPlay }">
          <img class="disc" src="@/static/images/song/disc.png" />
          <img
            class="musicImg"
            :src="songPlayInfo.al.picUrl"
          />
        </div>
      </div>
    </div>

    <div>
      <!-- 图标列表 -->
      <div class="icon-list">
        <i class="iconfont icon-xihuan-no"></i>
        <i class="iconfont icon-xiazai"></i>
        <div class="kge">
          <i class="iconfont icon-kge"></i>
          <span class="kge-count">12</span>
        </div>

        <div class="pinlun">
          <i class="iconfont icon-pinlun"></i>
          <span class="pinlun-count">32</span>
        </div>

        <i class="iconfont icon-gengduo"></i>
      </div>

      <!-- 进度条 -->
      <mt-range v-model="rangeValue" :step="1">
        <div slot="start">00:00</div>
        <div slot="end">03:10</div>
      </mt-range>

      <!-- 歌曲操作栏 -->
      <div class="operation-list">
        <i class="iconfont icon-aixinbofang"></i>
        <i class="iconfont icon-shangyishou"></i>
        <div class="play-box">
          <i v-if="isPlay" class="iconfont icon-bofang"></i>
          <i v-else class="iconfont icon-zanting"></i>
        </div>
        <i class="iconfont icon-xiayishou"></i>
        <i class="iconfont icon-bofangliebiao"></i>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "components/pageHeader/PageHeader";
import { Range } from "mint-ui";
import { mapActions, mapState} from "vuex";
export default {
  components: {
    PageHeader,
    [Range.name]: Range,
  },
  data() {
    return {
      isPlay: false, //歌曲是否正在播放
      rangeValue: 0, //歌曲已经播放的时长
    };
  },
  computed :{
    ...mapState (["songPlayInfo", "songPlayIdList", "songPlayIndex"]),
    autoNames () {
      let autoStr = ''
      if(!this.songPlayInfo.ar) return autoStr
      this.songPlayInfo.ar.forEach(auto => {
        autoStr +=  auto.name + '/'
      });
      return autoStr.slice(0, -1)
    }
  },
  methods: {
    ...mapActions(["getSongInfo", "upSongPlayIdList", "upSongPlayIndex"]),
  },
  mounted () {
    let ids = this.$route.query.id
    this.getSongInfo({ids})
  }
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

.song-play-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  height: 100%;
  /* background: rgba(255, 255, 255, 0); */
  background: pink;
}

.song-play-page > div:last-child {
  position: relative;
  top: -12px;
}

.cover {
  margin: auto;
}

/* 摇杆 */
.needle {
  position: relative;
  z-index: 99;
  top: 10px;
  left: 56%;
  width: 90px;
  margin-left: -45px;
  transform-origin: 40px 0;
  transform: rotate(-20deg);
  transition: transform 1s;
}

.needleRotate {
  transform: rotate(0deg);
}

/* 磁盘 */
.discContainer {
  position: relative;
  top: -45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.discAnimation {
  animation: disc 20s linear infinite;
  animation-delay: 1s;
}

.disc {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.603);
}

.musicImg {
  position: absolute;
  margin: auto;
  width: 170px;
  height: 170px;
  border-radius: 50%;
}

@keyframes disc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.icon-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.iconfont {
  color: white;
  font-size: 24px;
}

.icon-xiazai {
  font-size: 40px;
}

.icon-xihuang-on {
  color: #c7b5ff;
}

.icon-list div {
  position: relative;
}

.icon-list span {
  position: absolute;
  top: -2px;
  font-size: 10px;
  color: white;
}

.operation-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.play-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 2px solid white;
  border-radius: 50%;
}

.icon-bofang {
  font-size: 30px;
}

.mt-range {
  margin: 10px 0px;
}
</style>