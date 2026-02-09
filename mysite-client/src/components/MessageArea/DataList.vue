<template>
  <ul class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="44" />
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="time">{{ formatDate(item.createDate) }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import avatarUrl from "@/assets/avatar.jpg";
import formatDate from "@/utils/formatDate";
export default {
  components: {
    Avatar,
  },
  data() {
    return {
      avatarUrl,
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-list-container {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  border-bottom: 1px solid @gray;
  padding: 15px 0;
}
.avatar-container {
  margin-right: 20px;
}
.nickname {
  color: darken(@success, 10%);
  margin-bottom: 5px;
}
.content {
  font-size: 14px;
}
.data {
  flex: 1 1 auto;
  position: relative;
}
.time {
  position: absolute;
  right: 0;
  top: 5px;
  color: @gray;
  font-size: 12px;
}
</style>
