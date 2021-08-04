<template>
  <div class="desc-box">
    <div class="main" ref="main" @scroll="handleScroll">
      <div class="header">
        <div class="back" @click="$router.back()">
          <i class="iconfont icon-guanbi" />
        </div>
      </div>

      <div class="cover">
        <cover-item
            :size="180"
            :imgUrl="coverImgUrl"
            :volumeShow="false"
            :isAlbum="company && true"
          />
        <p class="name">{{ name }}</p>
      </div>

      <hr />

      <div class="desc">
        <div class="tag-list" v-if="tags">
          <span>标签:</span>
          <span class="tag" v-for="(tag, index) in tags" :key="index">{{
            tag
          }}</span>
        </div>

        <div class="company" v-if="company">
         发行公司: {{company}}
        </div>

        <div class="subType" v-if="subType">
         专辑类别: {{subType}}
        </div>


        <div class="description">
          <p v-for="(desc, index) in descList" :key="index">{{ desc }}</p>
        </div>
      </div>
    </div>
    <div class="bottom" ref="bottom">
      <button>保存封面</button>
    </div>
  </div>
</template>

<script>
import CoverItem from "components/coverItem/CoverItem";
export default {
  name:'DescPage',
  components: {
    CoverItem
  },
  props: {
    coverImgUrl: String,
    name: String,
    tags: Array,
    description: String,
    background: Object,
    subType:String,
    company:String
  },
  watch: {
    background() {
      document.styleSheets[0].addRule(
        ".desc-box",
        `background : ${this.backgroundImg}`
      );
    },
    "background.rdata": {
      handler() {
        let { background } = this;
        let backgroundImg = `linear-gradient(to right, rgba(${background.rdata},${background.gdata}, ${background.bdata}, 1) , rgba(${background.rdata},${background.gdata}, ${background.bdata}, 1))`;
        document.styleSheets[0].addRule(
          ".desc-box",
          `background : ${backgroundImg}`
        );
        document.styleSheets[0].addRule(
          ".bottom",
          `background : rgba(${background.rdata},${background.gdata}, ${background.bdata}, 1)`
        );
        document.styleSheets[0].addRule(
          ".bottom",
          `box-shadow : -100px 0px 100px 100px rgba(${background.rdata},${background.gdata}, ${background.bdata}, 0.7)`
        );
      },
      deep: true,
    },
  },
  computed: {
    descList() {
      return this.description ? this.description.split("\n") : "";
    },
  },
  methods: {
    handleScroll(event) {
      if (
        event.target.scrollTop + this.$refs.main.clientHeight ===
        this.$refs.main.scrollHeight
      ) {
        document.styleSheets[0].addRule(".bottom", `box-shadow : none`);
      } else {
        let { background } = this;
        document.styleSheets[0].addRule(
          ".bottom",
          `box-shadow : -100px 0px 100px 100px rgba(${background.rdata},${background.gdata}, ${background.bdata}, 0.7)`
        );
      }
    },
  },
};

</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  color: rgb(255, 255, 255);
  font-size: 11px;
}

.desc-box {
  padding: 12px;
  height: 100%;
}

.main {
  height: 92%;
  overflow: auto;
}


.header {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-end;
}

.back {
  text-align: center;
  margin-right: 10px;
}

.icon-guanbi {
  font-size: 12px;
}

hr {
  margin: auto;
  margin-bottom: 14px;
  width: 60%;
  transform: scaleY(0.3);
}

.cover {
  padding: 0px 16px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 20px;
  border: none;
  z-index: 2;
}

.cover-item {
  display: flex;
  justify-content: center;
}

.name {
  font-size: 12px;
  font-weight: bold;
}

.desc {
  font-size: 6px;
  padding: 0px 16px;
  line-height: 20px;
}

.tag {
  margin-left: 6px;
  padding: 1px 7px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.144);
}

.description p {
  margin-top: 20px;
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 1%;
  left: 0px;
  width: 100%;
  height: 8%;

  text-align: center;
}

.bottom button {
  width: 20%;
  height: 50%;
  border: none;
  border: 1px solid white;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0);
  font-size: 12px;
  line-height: 12px;
}

.main::-webkit-scrollbar {
  display: none;
}
</style>