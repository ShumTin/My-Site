<template>
  <div class="blog-detail-container">
    <h1>
      {{ blog.title }}
    </h1>
    <div class="aside">
      <span>日期:{{ formatDate(blog.createDate) }}</span>
      <span>浏览:{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论:{{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'BlogCategory',
          params: {
            categoryId: blog.category.id,
          },
        }"
      >
        {{ blog.category.name }}
      </RouterLink>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import { formatDate } from "@/utils";
import "highlight.js/styles/github.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/markdown.css";
.aside {
  font-size: 12px;
  color: @gray;
  margin-bottom: 15px;
  span,
  a {
    margin-right: 15px;
  }
}
</style>
