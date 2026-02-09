<template>
  <ul class="contact-container">
    <li>
      <a :href="data.github" target="_blank">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{ data.mail }}</span>
      </a>
    </li>
    <li>
      <a :href="`https://qm.qq.com/q/HKep8KppMA`" target="_blank">
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{ data.qq }}</span>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" />
      </div>
    </li>
    <li>
      <a>
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span style="text-indent: -2px">{{ data.weixin }}</span>
      </a>
      <div class="pop">
        <img :src="data.weixinQrCode" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";

export default {
  components: {
    Icon,
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  margin: 0;
  padding: 0;
  li {
    list-style: none;
    color: @gray;
    height: 30px;
    line-height: 30px;
    margin: 15px 14px;
    position: relative;
    @itemBottom: 35px;
    a {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      .icon {
        font-size: 26px;
        margin-right: 10px;
        &.weixin {
          font-size: 32px;
          text-indent: -3px;
        }
      }
      span {
        font-size: 14px;
      }
    }
    &:hover {
      .pop {
        visibility: visible;
      }
    }
    .pop {
      position: absolute;
      left: 0;
      bottom: @itemBottom;
      padding: 10px;
      background: #fff;
      border-radius: 10px;
      visibility: hidden;
      img {
        width: 150px;
        height: 150px;
        display: block;
      }
      &::after {
        position: absolute;
        content: "";
        width: 10px;
        height: 10px;
        background: #fff;
        top: 165px;
        left: 50%;
        transform: translateX(-50%);
        transform: rotate(45deg);
      }
    }
  }
}
</style>
