<template>
  <form
    ref="form"
    @submit.prevent="handleSubmit"
    class="data-form-container"
    id="data-form-container"
  >
    <div class="form-item">
      <div class="nickname">
        <input
          type="text"
          placeholder="用户昵称"
          maxlength="10"
          v-model="formData.nickname"
        />
        <span class="text-length">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>

    <div class="form-item">
      <div class="text-area">
        <textarea
          maxlength="300"
          placeholder="输入内容"
          v-model="formData.content"
        ></textarea>
        <span class="text-length">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>

    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmiting">
          {{ isSubmiting ? "提交中..." : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请输入内容";
      if (this.error.nickname || this.error.content) {
        // 有错误
        return;
      }
      this.isSubmiting = true; // 正在提交，防止重复点击
      this.$emit("submit", this.formData, (successMsg) => {
        this.isSubmiting = false;
        this.formData.nickname = "";
        this.formData.content = "";

        this.$showMessage({
          content: successMsg,
          type: "success",
          container: this.$refs.form,
        });
      }); // 父组件处理
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-form-container {
  overflow: hidden;
  margin-bottom: 20px;
}
.form-item {
  margin-bottom: 8px;
}
.nickname {
  width: 50%;
  position: relative;
}
.text-area {
  width: 100%;
  position: relative;
}
.text-length {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #bbb;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  height: 35px;
  padding: 0 15px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  color: @danger;
  margin-top: 4px;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  width: 100px;
  height: 34px;
  line-height: 34px;
  outline: none;
  border: none;
  color: #fff;
  background-color: @primary;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: darken(@primary, 10%);
  }
  &:disabled {
    background-color: lighten(@primary, 10%);
    cursor: not-allowed;
  }
}
</style>
