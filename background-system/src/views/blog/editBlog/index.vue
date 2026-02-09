<template>
  <div class="app-container">
    <blog-form :value="blogInfo" @submit="handleEdit" />
  </div>
</template>

<script>
import BlogForm from '../components/blogForm/index.vue'
import { modifyBlog, findOneBlog } from '@/api/blog'
export default {
  components: {
    BlogForm
  },
  data() {
    return {
      blogInfo: null
    }
  },
  async created() {
    const id = this.$route.params.id
    const resp = await findOneBlog(id)
    this.blogInfo = resp.data
  },
  methods: {
    handleEdit(formData) {
      const data = {
        ...formData,
        createDate: Date.now(),
        toc: []
      }

      if (!data.title || !data.description || !data.htmlContent || !data.categoryId) {
        return this.$message.error('请填写完整信息（图片选填）')
      }

      modifyBlog({
        id: this.blogInfo.id,
        data
      }).then(() => {
        this.$message.success('修改成功')
        this.$router.push('/blogList')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
