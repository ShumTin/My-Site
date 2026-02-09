<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import { debounce } from "@/utils";

export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      // 目前激活的锚点，即当前所浏览的标题
      activeAnchor: "",
    };
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    // 设置activeAnchor为正确的值
    setSelect(scrollDom) {
      if (!scrollDom) return;
      this.activeAnchor = "";
      // 规定一个范围（距离视口顶部距离），判断是否选中
      const range = 200;
      for (const dom of this.doms) {
        // 判断当前dom元素是否应该被选中
        if (!dom) {
          continue;
        }
        // 得到元素距离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        // console.log(top);
        if (top >= 0 && top <= range) {
          // 在规定范围内,则当前dom被选中
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定范围下方，则上一个dom被选中，即当前dom不选中
          return;
        } else {
          // 在规定范围上方,假设自己被激活，然后继续看后面
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  computed: {
    // 根据toc属性得到带有isSelected属性的toc数组
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelected: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    // 根据toc得到它们对应的元素数组
    doms() {
      const doms = [];

      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },

  created() {
    this.setSelectDebounce = debounce(this.setSelect, 100);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
