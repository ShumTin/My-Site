<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" :src="placeholder" class="placeholder" />
    <img
      @load="handleLoaded"
      :src="src"
      class="origin"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      originLoaded: false, // 原图是否加载完成
      everythingDone: false, // 所有操作都已经完成
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    handleLoaded() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit("load");
      }, this.duration);
    },
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;

    &.placeholder {
      filter: blur(2vw);
    }
  }
}
</style>
