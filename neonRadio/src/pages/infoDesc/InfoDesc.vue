<template>
  <div class="album-desc" v-if="playlist">
    <desc-page
      v-if="playlist.coverImgUrl"
      :background="background"
      :coverImgUrl="playlist.coverImgUrl"
      :name="playlist.name"
      :tags="playlist.tags"
      :description="playlist.description"
    />
    <desc-page
      v-else
      :background="background"
      :coverImgUrl="playlist.picUrl"
      :name="playlist.name"
      :description="playlist.description"
      :subType="playlist.subType"
      :company="playlist.company"
    />
  </div>
</template>

<script>
import DescPage from "components/descPage/DescPage";
export default {
  components: {
    DescPage,
  },
  data() {
    return {
      playlist: {},
      background: {},
    };
  },
  mounted() {
    this.playlist = this.$route.params.playlist;
    this.background = this.$route.params.bkg;
  },
};
</script>

<style scoped>
.album-desc {
  height: 100%;
}
</style>