<template>
  <div class="find-index" >
    <!-- 1.轮播图 -->
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(banner, index) in bannerList" :key="index">
          <img
            :src="banner.pic"
            @click="bannerGo(banner.targetType, banner.targetId)"
          />
          <p
            class="title"
            :class="{
              'title-red': banner.titleColor === 'red',
              'title-blue': banner.titleColor === 'blue',
            }"
          >
            {{ banner.typeTitle }}
          </p>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 2.导航按钮 -->
    <div class="nav">
      <div class="nav-box">
        <ul class="nav-ul">
          <li
            class="nav-li"
            v-for="(nav, index) in navList"
            :key="index"
            @click="nav.goUrl && $router.push(nav.goUrl)"
          >
            <div class="nav-img-box">
              <i class="nav-icon iconfont" :class="`icon-nav-${index + 1}`" />
            </div>
            <p>{{ nav.title }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 3.推荐歌单 -->
    <div class="recommend" >
      <tab-header
        titleLeft="推荐歌单"
        titleRight="更多"
        rightEvent="goPage"
      >
        <template v-slot:rightIconRight>
          <img src="@/static/images/more.svg" />
        </template>
      </tab-header>

      <div class="recommend-box">
        <div class="recommend-list"  >
          <cover-item
            @click.native="$router.push({path:'songsheet', query:{id: cover.id}})"
            @ready="recommenReady(index)"
            :size="100"
            :imgUrl="cover.coverImgUrl || cover.picUrl"
            :volume="cover.playcount || cover.playCount"
            v-for="(cover, index) in recommendList"
            :key="index"
          >
            <template v-slot:title>
              <p>{{ cover.name }}</p>
            </template>
          </cover-item>
        </div>
      </div>
    </div>

    <!-- 4.流行精选歌曲 -->
    <div class="popular" >
      <tab-header
        :titleLeft="popularSongType.title"
        titleRight="播放"
        leftEvent="updataPopular"
        @updataPopular="updataPopular()"
      >
        <template v-slot:leftIconLeft>
          <img src="@/static/images/shuaxin.svg" />
        </template>
        <template v-slot:rightIconLeft>
          <img src="@/static/images/play.svg" />
        </template>
      </tab-header>

      <div class="popular-box">
        <mt-tab-container
          class="popular-list"
          v-model="popularActive"
          swipeable
        >
          <mt-tab-container-item
            class="popular-li"
            :id="'popular' + index1"
            v-for="(SongList, index1) in popularSongList"
            :key="index1"
          >
            <song-item
              @click.native="$router.push({path:'SongPlayPage', query:{id: song.id}})"
              :state="1"
              :imgUrl="song.album.picUrl"
              v-for="(song, index) in SongList"
              :key="index"
              :songName="song.name"
              :authorList="song.artists"
              :comment="popularComment[index1][index]"
              :mvid="song.mvid"
            />
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>

    <!-- 5.新歌|新碟|数字专辑 -->
    <div class="news">
      <tab-header titleRight="更多">
        <template v-slot:rightIconRight>
          <img src="@/static/images/more.svg" />
        </template>
        <template v-slot:titleLeft>
          <div class="news-tab-box">
            <p
              class="news-tab"
              :class="{ 'news-tab-on': newsTabIndex === 0 }"
              @click="togglenewsTab(0)"
            >
              新歌
            </p>
            <p
              class="news-tab"
              :class="{ 'news-tab-on': newsTabIndex === 1 }"
              @click="togglenewsTab(1)"
            >
              新碟
            </p>
            <p
              class="news-tab"
              :class="{ 'news-tab-on': newsTabIndex === 2 }"
              @click="togglenewsTab(2)"
            >
              数字专辑
            </p>
          </div>
        </template>
      </tab-header>

      <div class="news-song" v-if="newsTabIndex === 0">
        <mt-tab-container class="news-list" v-model="newsSongActive" swipeable>
          <mt-tab-container-item
            class="news-li"
            :id="'newsSong' + index1"
            v-for="(SongList, index1) in newsSongList"
            :key="index1"
          >
            <song-item
              @click.native="$router.push({path:'SongPlayPage', query:{id: song.id}})"
              :state="1"
              :imgUrl="song.picUrl"
              v-for="(song, index) in SongList"
              :key="index"
              :songName="song.name"
              :authorList="song.song.artists"
               :comment="newsSongComment[index1][index]"
               :mvid="song.mvid"
            />
          </mt-tab-container-item>
        </mt-tab-container>
      </div>

      <div class="news-CD" v-if="newsTabIndex === 1">
        <mt-tab-container
          class="news-list"
          v-model="newsAlbumNewtActive"
          swipeable
        >
          <mt-tab-container-item
            class="news-li"
            :id="'newsAlbumNewt' + index1"
            v-for="(SongList, index1) in newsAlbumNewtList"
            :key="index1"
          >
            <song-item
              @click.native="$router.push({path:'album', query:{id: song.id}})"
              :state="1"
              :imgUrl="song.picUrl"
              v-for="(song, index) in SongList"
              :key="index"
              :songName="song.name"
              :authorList="song.artists"
              :mvid="song.mvid"
            />
          </mt-tab-container-item>
        </mt-tab-container>
      </div>

      <div class="news-albums" v-if="newsTabIndex === 2">
        <mt-tab-container class="news-list" v-model="newsAlbumActive" swipeable>
          <mt-tab-container-item
            class="news-li"
            :id="'newsAlbum' + index1"
            v-for="(SongList, index1) in newsAlbumList"
            :key="index1"
          >
            <song-item
            :state="1"
              :imgUrl="song.picUrl"
              v-for="(song, index) in SongList"
              :key="index"
              :songName="song.name"
              :authorList="song.artists"
              :mvid="song.mvid"
            />
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  CellSwipe,
  TabContainer,
  TabContainerItem,
} from "mint-ui";
import {
  reqBanner,
  reqRecommend,
  regHighquality,
  regPopularSongList,
  regNewsong,
  regAlbumNew,
  regAlbumNewest,
  regCommentMusic,
} from "@/service/index.js";
import BScroll from "better-scroll";
import TabHeader from "components/tabHeader/TabHeader";
import CoverItem from "components/coverItem/CoverItem";
import SongItem from "components/songItem/SongItem";
export default {
  name:'FindIndex',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [CellSwipe.name]: CellSwipe,
    [TabContainer.name]: TabContainer,
    [TabContainerItem.name]: TabContainerItem,
    TabHeader,
    CoverItem,
    SongItem,
  },
  data() {
    return {
      bannerList: [], //轮播图列表数据
      navList: [
        { goUrl: "", title: "每日推荐" },
        { goUrl: "", title: "私人FM" },
        { goUrl: "", title: "歌单" },
        { goUrl: "", title: "排行榜" },
        { goUrl: "", title: "直播" },
        { goUrl: "", title: "数字专辑" },
        { goUrl: "", title: "专注冥想" },
        { goUrl: "", title: "歌房" },
        { goUrl: "", title: "游戏专区" },
      ], //导航列表数据
      recommendList: [], //推荐歌单列表数据
      popularSongTypeList: [
        { title: "华语Top精选", type: 7 },
        { title: "欧美流行精选", type: 96 },
        { title: "日本流行精选", type: 8 },
        { title: "韩国Top精选", type: 16 },
      ], //流行歌曲分类
      popularSongType: "", //当前获取的流行歌曲类型
      popularSongList: [], //流行歌曲列表数据
      popularActive: "popular0", //当前流行歌曲的列表value值
      popularComment: [], //流行精选歌曲对应评论
      newsTabIndex: 0, //当前显示的选项
      newsSongList: [], //新歌列表
      newsSongComment: [], //新歌对应评论列表
      newsSongActive: "newsSong0", ////当前新歌的列表value值
      newsAlbumNewtList: [], //新碟列表
      newsAlbumNewtActive: "newsAlbumNewt0", ////当前新碟的列表value值
      newsAlbumList: [], //新专辑列表
      newsAlbumActive: "newsAlbum0", ////当前新专辑的列表value值
    };
  },
  computed: {},
  methods: {
    //跳转到相应的专辑页面或者歌曲页面
    bannerGo(targetType, targetId) {
      console.log(targetType, targetId);
    },
    //显示推荐歌单userInfo
    showRecommend() {
      //已登录状态，请求用户推荐歌单
      if (this.$store.state.cookie) {
        this.getRecommend();
      }
      //未登录状态，请求热门歌单
      else {
        this.getHighquality();
      }
    },

    //popular数据更新
    updataPopular() {
      this.getPopularSongList();
    },
    //监听recommen子组件是否渲染完毕
    recommenReady(index) {
      //实现推荐歌单横向滑动效果
      if (
        index ===
        document.querySelectorAll(".recommend .cover-item").length - 1
      )
        this.BScomputed(
          ".recommend-list",
          ".recommend .cover-item",
          ".recommend-box"
        );
    },
    //计算并实现横向滑动效果
    BScomputed(ul, li, box) {
      let _ul = document.querySelectorAll(ul)[0];
      let _item = document.querySelectorAll(li);
      let width = 0;
      for (let i = 0; i < _item.length; i++) width += _item[i].clientWidth;
      _ul.style.width = width + "px";
      new BScroll(box, {
        scrollX: true,
        click:true 
      });
    },
    //新歌新碟新专辑切换
    togglenewsTab(index) {
      this.newsTabIndex = index;
    },
    //实现一维数组向二维数组展开
    arryOpen(list, len, num) {
      if (list.length < len * num) return list;
      let newList = [];
      for (let i = 0, j = 0; i < len; i++, j += num) {
        newList.push(list.slice(j, j + num));
      }
      return newList;
    },
    //请求banner
    async getBanner() {
      let result = await reqBanner();
      this.bannerList = result.banners;
    },
    //请求用户推荐歌单
    async getRecommend() {
      let result = await reqRecommend();
      this.recommendList = result.recommend;
    },
    // 请求热门歌单
    async getHighquality() {
      let result = await regHighquality();
      this.recommendList = result.playlists;
    },
    //请求流行歌曲(10首)
    async getPopularSongList() {
      let redmon = Math.floor(Math.random() * (3 + 1));
      this.popularSongType = this.popularSongTypeList[redmon];
      let result = await regPopularSongList({
        type: this.popularSongTypeList[redmon].type,
      });
      this.popularSongList = this.arryOpen(result.data, 4, 3);
      this.popularComment = this.getCommentMusic(this.popularSongList);
    },
    //请求新歌
    async getNewsong() {
      let result = await regNewsong();
      this.newsSongList = this.arryOpen(result.result, 3, 3);
      this.newsSongComment = this.getCommentMusic(this.newsSongList);
    },
    //请求新碟
    async getAlbumNew() {
      let result = await regAlbumNew();
      this.newsAlbumNewtList = this.arryOpen(result.albums, 3, 3);
    },
    //请求新专辑
    async getAlbum() {
      let result = await regAlbumNewest();
      this.newsAlbumList = this.arryOpen(result.albums, 3, 3);
    },
    //请求流行歌曲对应评论
    getCommentMusic(SongList) {
      let list = [];
      SongList.forEach((arr, index1) => {
        list.push([]);
        arr.forEach(async (song) => {
          let result = await regCommentMusic({ id: song.id, limit: 1 });
          let hotComments = result.hotComments;
          let comment = "";
          hotComments.forEach((item, index) => {
            if (index === 0) comment = item.content;
            else
              item.content.length < comment.length
                ? (comment = item.content)
                : "";
          });
          list[index1].push(comment);
        });
      });
      return list;
    },
    goDetails() {
      this.$router.push({path: '/album', params: {id: cover.id}})
    }
  },
  mounted() {
    this.getBanner(); //请求banner
    this.showRecommend(); //请求推荐歌单

    //实现导航横向滑动效果
    this.BScomputed(".nav-ul", ".nav-li", ".nav-box");

    this.getPopularSongList(); //请求流行歌曲

    this.getNewsong(); //请求新歌
    this.getAlbumNew(); //请求新碟
    this.getAlbum(); //请求新专辑
  },
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.find-index > div {
  padding: 0px 12px;
}
/* 1.轮播图 */
.banner {
  position: relative;
  height: 150px;
  border-radius: 10px;
  margin: 12px 0px;
}

.banner img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.banner .title {
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 4px 10px;
  border-radius: 10px 0px;
  color: white;
}

.banner .title-red {
  background: rgb(204, 204, 518);
}

.banner .title-blue {
  background: rgb(43, 156, 231);
}

/* 导航图标栏 */
.find-index .nav {
  padding-bottom: 12px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.089);
}

.nav-ul {
  display: flex;
}

.nav-li {
  padding-right: 20px;
  text-align: center;
}

.nav-li:last-of-type {
  padding-right: 0;
}

.nav-img-box {
  margin-bottom: 8px;
  width: 46px;
  height: 46px;
  line-height: 46px;
  border-radius: 50%;
  background: #9374e91e;
}

.nav-icon {
  font-size: 24px;
  color: #c7b5ff;
}

.nav-li p {
  width: 50px;
}
/* 推荐歌单 */
.find-index .recommend {
  margin: 20px 0px;
}
.header {
  margin-bottom: 12px;
}
.recommend-list {
  display: flex;
}

.recommend .cover-item {
  padding-right: 14px;
}
.recommend .cover-item:last-of-type {
  padding-right: 0;
}

/* 流行精选歌单 */
.popular-ul {
  display: flex;
}

.popular-li {
  width: 350px;
}

.popular .header {
  margin-bottom: 0px;
}

/* 新歌|新碟|数字专辑 */
.news {
  margin: 20px 0;
}
.news-tab-box {
  display: flex;
}
.news-tab {
  height: 16px;
  line-height: 16px;
  text-align: center;
  color: rgba(128, 129, 131, 0.774);
}
.news-tab:nth-child(even) {
  margin: 0px 10px;
  padding: 0px 10px;
  border-left: 1px solid rgba(128, 129, 131, 0.774);
  border-right: 1px solid rgba(128, 129, 131, 0.774);
}

.news-tab-on {
  color: black;
}
</style>