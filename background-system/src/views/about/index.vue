<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input v-model="url" placeholder="请输入内容" :disabled="disabled" />
    <el-button type="primary" style="margin-top: 15px;" @click="clickHandle">{{ btnContent }}</el-button>
  </div>
</template>

<script>
import { getAbout, setAbout } from '@/api/about'

export default {
  data() {
    return {
      url: '',
      disabled: true,
      btnContent: '编辑'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.url = data
      })
    },
    clickHandle() {
      if (this.btnContent === '编辑') {
        this.btnContent = '完成'
        this.disabled = !this.disabled
      } else {
        if (this.url) {
          this.btnContent = '编辑'
          this.disabled = !this.disabled
          setAbout({ url: this.url }).then(() => {
            this.$message.success('修改成功')
          }).catch(() => {
            this.$message.error('修改失败')
            this.fetchData()
          })
        } else {
          this.$message.warning('输入框不能为空')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block{
    margin: 15px 0;
}
</style>
