<template>
  <div class="blog-form">
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px;">
      <el-input v-model="form.title" placeholder="请输入文章标题" />
    </div>

    <div class="block">文章编辑</div>
    <editor ref="editor" :initial-value="form.editorText" height="600px" :options="editorOptions" />

    <div class="block">文章描述</div>
    <el-input v-model="form.description" type="textarea" resize="none" rows="6" />

    <upload-img v-model="form.thumb" upload-title="文章头图" />

    <div class="block">选择分类</div>
    <el-select v-model="form.categoryId" placeholder="请选择文章分类">
      <el-option v-for="item in blogType" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>

    <div class="actions">
      <el-button type="primary" @click="handleSubmit">{{ btnContent }}</el-button>
    </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { Editor } from '@toast-ui/vue-editor'
import UploadImg from '@/components/UploadImg'
import { getBlogType } from '@/api/blogType'
export default {
  components: { Editor, UploadImg },

  props: {
    value: {
      type: Object,
      default: null

    } // v-model 接收外部数据
  },
  data() {
    return {
      blogType: [],
      form: {
        title: '',
        description: '',
        thumb: '',
        categoryId: ''
      },
      btnContent: '',
      editorOptions: {
        language: 'zh-CN'
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.btnContent = '发布文章'
          return
        }
        this.form = {
          title: val.title,
          description: val.description,
          thumb: val.thumb,
          categoryId: val.category?.id || ''
        }
        this.btnContent = '确认修改'
        this.$nextTick(() => {
          if (this.$refs.editor) {
            this.$refs.editor.invoke('setHTML', val.htmlContent)
          }
        })
      }
    }
  },
  async created() {
    const resp = await getBlogType()
    this.blogType = resp.data
  },
  methods: {
    handleSubmit() {
      const htmlContent = this.$refs.editor.invoke('getHTML')
      const markdownContent = this.$refs.editor.invoke('getMarkdown')

      const data = {
        ...this.form,
        htmlContent,
        markdownContent
      }
      this.$emit('submit', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.block{
  margin: 15px 0;
  font-weight: 500;
}
.actions{
  margin-top: 20px;
}
</style>
