<template>
  <div class="details-info-page" v-if="infoList.playlist || infoList.album">
    <!-- 内容介绍 -->
    <div class="details-info">
      <!-- 顶部索引 -->
      <page-header :title="state" />

      <!-- 专辑介绍 -->
      <div
        class="alum"
        v-if="state == '专辑'"
        @click="
          $router.push({
            name: 'albumDesc',
            params: { playlist: infoList.album, bkg: background },
          })
        "
      >
        <div class="info-pic alum-pic">
          <cover-item
            :size="100"
            :imgUrl="infoList.album.picUrl"
            :volumeShow="false"
            :isAlbum="true"
          />
        </div>
        <div class="info info-alum">
          <div class="info-name alum-name">{{ infoList.album.name }}</div>
          <div
            class="info-auto alum-auto"
            @click.stop="regAuto(infoList.playlist.creator.userId)"
          >
            <div>歌手: {{ infoList.album.artists[0].name }}</div>
            <i class="iconfont icon-more" />
          </div>

          <div class="info-bottom">
            <div class="info-time alum-time">
              发行时间: {{ infoList.album.publishTime | dateString }}
            </div>
            <div class="info-desc alum-desc">
              <div>
                {{ infoList.album.description }}
              </div>
              <i class="iconfont icon-more" />
            </div>
          </div>
        </div>
      </div>

      <!-- 歌单介绍 -->
      <div
        class="sheet"
        v-if="state == '歌单'"
        @click="
          $router.push({
            name: 'songDesc',
            params: { playlist: infoList.playlist, bkg: background },
          })
        "
      >
        <div class="info-pic sheet-pic">
          <cover-item
            :size="100"
            :imgUrl="infoList.playlist.coverImgUrl"
            :volume="infoList.playlist.playCount"
            :isSheet="true"
          />
        </div>
        <div class="info info-sheet">
          <div class="info-name sheet-name">{{ infoList.playlist.name }}</div>
          <div
            class="info-auto sheet-auto"
            @click.stop="regAuto(infoList.playlist.creator.userId)"
          >
            <div><img :src="infoList.playlist.creator.avatarUrl" /></div>
            <div>{{ infoList.playlist.creator.nickname }}</div>
            <i class="iconfont icon-more" />
          </div>

          <div class="info-bottom">
            <div class="info-desc sheet-desc">
              <div>
                {{ infoList.playlist.description }}
              </div>
              <i class="iconfont icon-more" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 收藏、评论、分享列表 -->
    <div class="tab-box">
      <div class="tab-sub">
        <i class="iconfont icon-shoucangjia"></i>
        <span v-if="infoList.playlist">{{
          infoList.playlist.subscribedCount | filterVolume
        }}</span>
        <span v-else>{{ infoList.album.info.likedCount | filterVolume }}</span>
      </div>
      <div class="tab-comment">
        <i class="iconfont icon-pinlun"></i>
        <span v-if="infoList.playlist">{{
          infoList.playlist.commentCount | filterVolume
        }}</span>
        <span v-else>{{
          infoList.album.info.commentCount | filterVolume
        }}</span>
      </div>
      <div class="tab-share">
        <i class="iconfont icon-fenxiang"></i>
        <span v-if="infoList.playlist">{{
          infoList.playlist.shareCount | filterVolume
        }}</span>
        <span v-else>{{ infoList.album.info.shareCount | filterVolume }}</span>
      </div>
    </div>

    <!-- 播放列表 -->
    <div class="song-box">
      <!-- 播放全部横栏 -->
      <div class="play-all">
        <div class="play-btn">
          <i class="iconfont icon-bofangAll"></i>
        </div>
        <div class="play-title">
          <p v-if="infoList.playlist">
            播放全部 <span>({{ infoList.playlist.trackCount }})</span>
          </p>
          <p v-else>
            播放全部 <span>({{ infoList.album.size }})</span>
          </p>
        </div>
        <div class="download-btn">
          <i class="iconfont icon-xiazai"></i>
        </div>
        <div class="select-btn">
          <i class="iconfont icon-quanxuan"></i>
        </div>
      </div>

      <div class="song-list" v-if="infoList.playlist">
        <song-item
          v-for="(song, index) in infoList.playlist.tracks"
          :key="index"
          :state="2"
          :songName="song.name"
          :authorList="song.ar"
          :mvid="song.mv"
          :alName="song.al.name"
        >
          <template #left>
            <p>{{ index + 1 }}</p>
          </template>
        </song-item>
      </div>

      <div class="song-list" v-else>
        <song-item
          v-for="(song, index) in infoList.songs"
          :key="index"
          :state="2"
          :songName="song.name"
          :authorList="song.ar"
          :mvid="song.mv"
          :alName="song.al.name"
        >
          <template #left>
            <p>{{ index + 1 }}</p>
          </template>
        </song-item>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "components/pageHeader/PageHeader";
import CoverItem from "components/coverItem/CoverItem";
import SongItem from "components/songItem/SongItem";
import { getColor } from "@/commFunction/getColor";
export default {
  props: {
    infoList: Object, //详情数据
    state: String, //1：专辑，2：歌单
  },
  data() {
    return {
      background: {
        rdata: 0,
        gdata: 0,
        bdata: 0,
      }, //背景颜色rgb值
    };
  },
  components: {
    CoverItem,
    PageHeader,
    SongItem,
  },
  watch: {
    //获取背景颜色
    infoList() {
      if (this.infoList.playlist)
        getColor(this.infoList.playlist.coverImgUrl, this.background);
      else getColor(this.infoList.album.picUrl, this.background);
    },
    //设置背景颜色
    "background.rdata": {
      handler() {
        let { background } = this;
        let backgroundImg = `linear-gradient(to right, rgba(${background.rdata},${background.gdata}, ${background.bdata}, 1) , rgba(${background.rdata},${background.gdata}, ${background.bdata}, 0.7))`;
        document.styleSheets[0].addRule(
          ".details-info::after",
          `background : ${backgroundImg}`
        );
      },
      deep: true,
    },
  },
  methods: {
    regAuto() {},
  },
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

.details-info {
  position: relative;
  padding: 12px;
}

.song-box {
  padding: 12px;
  margin-top: 10px;
}

.details-info::after {
  content: "";
  width: 140%;
  height: 100%;
  position: absolute;
  left: -20%;
  top: 0;
  z-index: -2;
  border-radius: 0 0 25% 25%;
}

.alum,
.sheet {
  display: flex;
  align-items: center;
  margin: 20px 0px;
  height: 120px;
}

.info-pic {
  margin-right: 12px;
}

.info-pic img {
  border-radius: 12px;
}

.sheet-pic img {
  width: 100px;
  height: 100px;
}

.info {
  position: relative;
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  /* height: 90px; */
  color: rgb(238, 236, 236);
}

.info-auto {
  display: flex;
  line-height: 20px;
  font-size: 12px;
}
.info-auto img {
  margin-right: 6px;
  width: 22px;
  border-radius: 50%;
}

.info-name {
  margin-bottom: 10px;
  font-size: 14px;
  color: white;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.info-bottom {
  position: absolute;
  bottom: 0px;
}
.alum-time {
  margin-bottom: 5px;
}

.info-desc {
  display: flex;
  justify-content: space-between;
}

.info-desc > div {
  width: 70%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.details-info .iconfont {
  font-size: 10px;
}

.tab-box {
  display: flex;
  justify-content: space-evenly;
  width: 75%;
  height: 40px;
  margin: auto;
  margin-top: -20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 2px 6px 0px rgb(224, 222, 222);
  line-height: 40px;
  font-size: 14px;
}

.tab-box .iconfont {
  font-size: 16px;
  margin-right: 2px;
}

.play-all {
  display: flex;
  justify-content: space-between;
}

.play-btn i {
  color: #c7b5ff;
}

.play-title {
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
}

.play-title span {
  font-size: 12px;
  font-weight: normal;
  color: rgb(163, 163, 163);
}

.play-all .iconfont {
  font-size: 26px;
}

.play-all .icon-bofangAll {
  font-size: 22px;
}

.play-title {
  width: 70%;
}

.play-btn {
  width: 10%;
  text-align: center;
}

.download-btn,
.select-btn {
  text-align: end;
  width: 10%;
}
</style>