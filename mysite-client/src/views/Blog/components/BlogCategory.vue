<template>
  <div class="blog-category-container">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import fetchData from "@/mixins/fetchData";
import { getBlogTypes } from "@/api/blog";
export default {
  components: {
    RightList,
  },
  mixins: [fetchData([])],
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (sum, item) => sum + item.articleCount,
        0
      );
      const result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      return result.map((item) => ({
        ...item,
        isSelected: item.id === this.categoryId,
        aside: `${item.articleCount} 篇`,
      }));
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
  },
  methods: {
    async fetchData() {
      return await getBlogTypes();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      if (item.id === -1) {
        //  /article?page=xxx&limit=xxx
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        //  /article/cate/x?page=xxx&limit=xxx
        this.$router.push({
          name: "BlogCategory",
          params: {
            categoryId: item.id,
          },
          query,
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
