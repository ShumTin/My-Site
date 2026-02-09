<template>
  <div
    v-loading="loading"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
    @transitionend="handleTransitionend"
  >
    <ul class="carousel-container" :style="{ marginTop }">
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div
      @click="switchTo(index - 1)"
      :class="['icon', 'icon-up', { hidden: index < 1 }]"
    >
      <Icon type="arrowUp" />
    </div>
    <div
      @click="switchTo(index + 1)"
      :class="['icon', 'icon-down', { hidden: index >= data.length - 1 }]"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicators">
      <li
        @click="switchTo(i)"
        :class="{ active: i === index }"
        v-for="(item, i) in data"
        :key="item.id"
      ></li>
    </ul>
  </div>
</template>

<script>
import CarouselItem from "./CarouselItem.vue";
import Icon from "@/components/Icon";
import { mapState } from "vuex";

export default {
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0, // 当前显示的轮播图索引
      containerHeight: 0, // 容器高度
      scrollLock: false, // 控制滚轮切换图片
    };
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    // 切换轮播图
    switchTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.scrollLock) return;

      const banners = this.banners || [];

      if (e.deltaY > 0 && this.index < banners.length - 1) {
        this.scrollLock = true;
        this.switchTo(this.index + 1);
      } else if (e.deltaY < 0 && this.index > 0) {
        this.scrollLock = true;
        this.switchTo(this.index - 1);
      }
    },
    handleTransitionend() {
      this.scrollLock = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
  created() {
    this.$store.dispatch("banner/fetchBanners");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
}
.carousel-container {
  width: 100%;
  height: 100%;
  transition: 0.5s;
  li {
    width: 100%;
    height: 100%;
  }
}
.icon {
  .self-center(absolute);
  transform: translateX(-50%);
  @gap: 25px;
  color: @gray;
  cursor: pointer;
  font-size: 30px;
  transition: opacity 0.5s;
  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}
.indicators {
  .self-center(absolute);
  transform: translateY(-50%);
  right: 20px;
  left: auto;
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    border: 1px solid white;
    box-sizing: border-box;
    margin: 5px 0;
    &.active {
      background: #fff;
    }
  }
}
</style>
