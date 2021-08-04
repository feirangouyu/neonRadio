<template>
  <div class="song">
    <div class="song-item1" v-if="state === 1">
      <cover-item :size="46" :imgUrl="imgUrl" :volumeShow="false">
        <template v-slot:central>
          <img src="@/static/images/bofan.svg" />
        </template>
      </cover-item>
      <div class="info">
        <span>
          <span class="song-name">{{ songName.trim() }}</span>
          <span class="author-name">-{{ authorName.trim() }}</span>
        </span>
        <p class="comment" v-if="comment">{{ comment }}</p>
        <img v-if="mvid" src="@/static/images/shipinbofang.svg" />
      </div>
    </div>
    <div class="song-item2" v-if="state === 2">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="info">
        <p class="song-name">{{ songName.trim() }}</p>
        <p class="author-name">{{authorName.trim() + '-' + alName}}</p>
      </div>
      <div class="mv">
        <img v-if="mvid" src="@/static/images/shipinbofang.svg" />
      </div>
      <div class="right">
        <slot name="right">
          <i class="iconfont icon-gengduo"/>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import CoverItem from "components/coverItem/CoverItem";
export default {
  props: {
    imgUrl: String,
    songName: String,
    authorList: Array,
    comment: String,
    mvid: Number,
    state: Number,
    alName: String,
  },
  components: {
    CoverItem,
  },
  computed: {
    authorName() {
      let name = "";
      let arr = this.authorList;
      
      arr.forEach((e) => {
        name += "/" + e.name;
      });
      return name.slice(1, name.length);
    },
  },
  mounted() {
    this.$emit("ready");
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
  white-space: nowrap; 
  text-overflow: ellipsis; 
}

.song > div {
  display: flex;
  height: 55px;
  width: 100%;
}

.cover-item {
  line-height: 60px;
}

.song-item1 .info > span {
  position: absolute;
  top: 12%;
  width: 80%;
  color: rgb(126, 125, 125);
}

.song-item1 .song-name {
  margin-left: 12px;
  font-size: 15px;
  color: black;
}
.song-item1 .author-name {
  margin-left: 2px;
  font-size: 10px;
  
}
.song-item1 .info {
  position: relative;
  width: 80%;
}

.info img {
  position: absolute;
  right: 0px;
  top: 20%;
  width: 16px;
  height: 16px;
}

.comment {
  margin: 30px 10px;
  width: 80%;
  color: rgb(126, 125, 125);
}

.song-item2 {
  justify-content: space-between;
  align-items: center;
  color: rgb(126, 125, 125);
}

.song-item2 .info {
  line-height: 18px;
}

.song-item2 .song-name {
  font-size: 13px;
  color: black;
}

.song-item2 .author-name {
  width: 96%;
  font-size: 11px;
}

.song-item2 .icon-gengduo {
  font-size: 14px;
}

.song-item2 .info {
  width: 80%;
}

.song-item2 .mv {
  width: 18px;
}

.song-item2 .mv img {
  width: 16px;
  height: 16px;
}

.song-item2 .left {
  text-align: center;
  width: 10%;
}

.song-item2 .right{
  text-align: end;
  width: 10%;
}

.song-item2 .mv {
  position: relative;
  right: 0px;
}

</style>