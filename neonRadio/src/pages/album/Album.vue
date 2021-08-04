<template>
  <div class="album-page">
    <details-info v-if="albumInfo" :infoList="albumInfo" state="专辑"/>
  </div>
</template>

<script>

import DetailsInfo from 'components/detailsInfo/DetailsInfo'
import {regAlbum} from '@/service/index'
export default {
  name:'Album',
  components: {
    DetailsInfo
  },
  data () {
    return { 
      id: 0, //专辑id
      albumInfo: {}, //专辑详情
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    this.getAlbum()
  },
  methods: {
    //请求专辑详情数据
    async getAlbum () {
      this.albumInfo = await regAlbum({id: this.id})
    },
  },
}
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

</style>