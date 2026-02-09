<template>
  <div class="app-container">
    <blog-form @submit="handleAdd" />
  </div>
</template>

<script>
import BlogForm from '../components/blogForm/index.vue'
import { publishBlog } from '@/api/blog'
export default {
  components: {
    BlogForm
  },
  methods: {
    handleAdd(formData) {
      const data = {
        ...formData,
        createDate: Date.now(),
        toc: []
      }

      if (!data.title || !data.description || !data.htmlContent || !data.categoryId) {
        return this.$message.error('请填写完整信息（图片选填）')
      }

      publishBlog(data).then(() => {
        this.$router.push('/blogList')
        this.$message.success('发布成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
