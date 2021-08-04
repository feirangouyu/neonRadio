<template>
  <div class="header">
    <!-- 左/右盒子文本内容 left-title right-title 
    左/右盒子图片 left-icon-left left-icon-right right-icon-left right-icon-right
    左/右盒子点击事件 left-event right-event -->
    <div class="left-box" @click="leftEvent && $emit(leftEvent)" >
      
      <div class="left-icon-left">
        <slot name="leftIconLeft"></slot>
      </div>

      <div class="title-left" v-if='!titleLeft'>
        <slot name="titleLeft"></slot>
       </div>

      <p class="title-left" v-if="titleLeft">{{titleLeft}}</p>

      <div class="left-icon-right" >
        <slot name="leftIconRight"></slot>
      </div>
      
    </div>

    <div class="right-box" @click="rightEvent && $emit(rightEvent)">
      <div class="right-icon-left" >
        <slot name="rightIconLeft"></slot>
      </div>
      <p class="title-right" v-if="titleRight">{{titleRight}}</p>
      <div class="right-icon-right" >
        <slot name="rightIconRight"></slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    titleLeft: {
      type:String,
      default:''
    },
    titleRight : {
      type:String,
      default:''
    },
    leftIconLeft: {
      type:String,
      default:''
    },
    leftIconRight: {
      type:String,
      default:''
    },
    rightIconLeft: {
      type:String,
      default:''
    },
    rightIconRight: {
      type:String,
      default:''
    },
    leftEvent: {
      type:String,
      default:''
    },
    rightEvent: {
      type:String,
      default:''
    },
  }

}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.left-box {
  display: flex;
}

.left-box > div {
  line-height: 30px;
}

.left-box .left-icon-left {
  margin-right: 5px;
}

.left-box .left-icon-right {
  margin-left: 5px;
}

.right-box {
  display: flex;
  justify-content: center;
  width: 55px;
  height: 20px;
  border: 0.5px solid rgba(190, 190, 185, 0.767);
  border-radius: 20px;
  line-height: 20px;
}

.title-left {
  font-size: 15px;
  font-weight: bold;
}
.right-box > div {
  line-height: 26px;
} 

.left-box img{
  width: 16px;
}

.right-box img {
  width: 14px;
}

</style>