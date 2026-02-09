export default function (refValue) {
  return {
    mounted() {
      this.$bus.$on("setMainScroll", this.setMainScroll);
      this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);
    },
    beforeDestroy() {
      this.$bus.$off("setMainScroll", this.setMainScroll);
      this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
      this.$bus.$emit("mainScroll", null);
    },
    methods: {
      setMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop;
      },
      handleMainScroll() {
        this.$bus.$emit("mainScroll", this.$refs[refValue]);
      },
    },
  };
}
