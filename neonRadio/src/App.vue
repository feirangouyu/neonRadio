<template>
  <div id="app">

    <keep-alive include="FindIndex">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{
    
  },
  
}
</script>

<style>
@import url('./static/font/font.css');
#app {
  height: 100%;
}
::-webkit-scrollbar{
  width:0;
}
</style>
