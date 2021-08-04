<template>
  <div class="page-header" :class="{'page-header-max':name}" :style="{ background: background }">
    <div class="page-back"  @click="$router.back()">
      <img src="@/static/images/page-back.svg" />
      <p class="page-title" v-if="title">{{ title }}</p>
    </div>

    <div class="song" v-if="name" @click="$emit('click')">
      <p class="song-name">{{ name }}</p>
      <div class="auto-box">
        <p class="song-auto">{{ auto }}</p>
        <i class="iconfont icon-more"></i>
      </div>
      
    </div>

    <div class="page-share" v-if="share">
      <i class="iconfont icon-fenxiang"/>
    </div>

    <div class="page-more" v-else>
      <img src="@/static/images/page-more.svg" />
    </div>

    

  </div>
</template>

<script>
export default {
  props: {
    title: String,
    background:{
      type:String,
      default:'rgba(0, 0, 0, 0)'
    } ,
    name: String,
    autoList: Array,
    auto:String,
    share:Boolean
  },
  // computed: {
  //   auto () {
      
  //   }
  // }
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  line-height: 30px;
}

.page-header-max {
  height: 45px;
}
.page-back,
.page-share {
  display: flex;
}

.page-title {
  color: white;
  font-size: 14px;
}

.page-back img {
  width: 20px;
  margin-right: 10px;
}

.page-more {
  justify-content: flex-end;
}

.page-share {
  justify-content: flex-end;
}

.page-share .icon-fenxiang {
  margin-top: 5px;
  font-size: 20px;
  color: white;
}


.page-more img {
  width: 16px;
}

.song {
  text-align: center;
  width: 70%;
}

.song-name {
  margin: auto;
  width: 60%;
  height: 50%;
  color: white;
  font-size: 16px;
}

.auto-box {
  margin: auto;
  position:relative;
  width: 60%;
}

.song-auto {
  display: inline-block;
  width: 70%;
  overflow: hidden;
  white-space: nowrap; 
  text-overflow: ellipsis; 
  color: rgb(177, 175, 175);
}

.icon-more {
  position: absolute;
  right: 5%;
  font-size: 10px;
  color:rgb(177, 175, 175) ;
}

</style>