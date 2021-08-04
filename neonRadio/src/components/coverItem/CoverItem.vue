<template>
  <div class="cover-item" >
    <div class="cover" :style="{ width: size / 37.5 + 'rem', height: size / 37.5 + 'rem' }">
      
      <!-- 封面图 -->
      <div class="cover-img">
        <img
          :src="imgUrl"
          :style="{ width: size / 37.5 + 'rem', height: size / 37.5 + 'rem' }"
        />
        
        <div v-if="isAlbum || isSheet" :class="{'album-img-box':isAlbum,'sheet-img-box':isSheet}" :style="{ width: (size-15) / 37.5 + 'rem', height: (size-15) / 37.5 + 'rem' }"></div>
      </div>
      <!-- 顶部的左侧 -->
      <div class="top-left">
        <slot name="topLeft">
        </slot>
      </div>
       <!-- 顶部的右侧 -->
      <div class="top-right" v-if="volumeShow">
        <img src="@/static/images/volume.svg" />
        <span class="volume">{{ volume | filterVolume }}</span>
        
      </div>
      <!-- 中间部分 -->
      <div class="central">
        <slot name="central">
          <!-- <img src="@/static/images/bofan.svg" /> -->
        </slot>
      </div>
      <!-- 标题介绍 -->
      <div class="cover-title">
        <slot name="coverTitle">
          <!-- <h3>法语</h3>
          <h3>浪漫风情</h3> -->
        </slot>
      </div>
    </div>
    <!-- 歌单名 -->
    <div class="title">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100,
    },
    imgUrl: String,
    volume: Number,
    volumeShow: {
      type: Boolean,
      default: true,
    }, 
    isAlbum: {
      type: Boolean,
      default: false,
    },
    isSheet: {
      type: Boolean,
      default: false,
    },
    
  },
  mounted () {
    this.$emit('ready')
  }
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

.cover {
  position: relative;
  
}

.album-img-box {
  position: absolute;
  top: -12%;
  left: 5%;
  background: rgba(0, 0, 0, 0.781);
  border-radius: 50%;
  z-index: -1;
} 

.sheet-img-box {
  position: absolute;
  top: -6%;
  left: 5%;
  background: rgba(250, 250, 250, 0.157);
  border-radius: 10px;
  z-index: -1;
}

.cover-img {
  position: relative;
  z-index: 0;
}

.cover-img img {
  border-radius: 12px;
}

.top-right {
  position: absolute;
  top: 4px;
  right: 4px;
  height: 16px;
  padding: 0px 5px;
  background: rgba(0, 0, 0, 0.198);
  border-radius: 20px;
  color: white;
  line-height: 12px;
}

.top-right img {
  position: relative;
  top: 2px;
  left: 1px;
  width: 11px;
}

.top-right span {
  font-size: 9px;
}

.top-left {
  position: absolute;
  top: 8px;
  left: 5px;
}

.top-left img {
  width: 14px;
  height: 14px;
}

.central img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  opacity: 0.8;
}


.title {
  margin-top: 4px;
}
.title p {
  display:-webkit-box;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}

.cover-title {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.cover-title h3{
  color: white;
  letter-spacing: 2px;
}
</style>