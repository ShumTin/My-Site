<template>
  <div class="empty-container">
    <Icon type="empty" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.empty-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: @lightWords;
  span {
    font-weight: bold;
  }
}
.icon-container {
  font-size: 100px;
  margin-bottom: 20px;
}
</style>
