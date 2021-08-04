<template>
  <div class="sheet-page">
    <details-info :infoList="sheetInfo" state="歌单"/>
  </div>
</template>

<script>

import DetailsInfo from 'components/detailsInfo/DetailsInfo'
import {regSongSheet} from '@/service/index'
export default {
  name:'SongSheet',
  components: {
    DetailsInfo
  },
  data () {
    return {
      id: 0, //歌单id
      sheetInfo: {}, //歌单详情
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    this.getSongSheet()
  },
  methods: {
    //请求歌单详情数据
    async getSongSheet () {
      this.sheetInfo = await regSongSheet({id: this.id})
    },
  }
}
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

</style>