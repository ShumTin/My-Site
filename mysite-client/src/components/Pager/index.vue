<template>
  <!-- 总页数大于1时才显示 -->
  <div class="pager-container" v-if="totalPage > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }">
      |&lt;&lt;
    </a>
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }">
      &lt;&lt;
    </a>
    <a
      @click="handleClick(n)"
      v-for="(n, i) in pageArr"
      :key="i"
      :class="{ active: n === current }"
    >
      {{ n }}
    </a>
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === totalPage }"
    >
      &gt;&gt;
    </a>
    <a
      @click="handleClick(totalPage)"
      :class="{ disabled: current === totalPage }"
    >
      &gt;&gt;|
    </a>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    totalPage() {
      // 总页码
      return Math.ceil(this.total / this.limit);
    },
    pageArr() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) min = 1;
      let max = min + this.visibleNumber - 1;
      if (max > this.totalPage) max = this.totalPage;
      const arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) newPage = 1;
      if (newPage > this.totalPage) newPage = this.totalPage;
      if (newPage === this.current) return;
      // 抛出一个事件
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    user-select: none;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
    }
  }
}
</style>
