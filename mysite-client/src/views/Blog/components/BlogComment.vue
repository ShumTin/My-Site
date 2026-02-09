<template>
  <MessageArea
    title="评论列表"
    :subTitle="`(${data.total})`"
    :list="data.rows"
    :isListLoading="isLoading"
    @submit="handleSubmit"
  />
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getComments } from "@/api/blog";
import { postComment } from "@/api/blog";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 正在加载更多
        return;
      }
      const range = 100; // 一个可接受的范围，在这个范围内都算到达页面底部
      const diff = Math.abs(
        dom.scrollHeight - (dom.scrollTop + dom.clientHeight)
      );
      if (diff < range) {
        this.fetchMore();
      }
    },
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    // 加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        // 没有更多数据了
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("评论成功");
    },
  },
};
</script>

<style></style>
