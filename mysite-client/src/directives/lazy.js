import eventBus from "@/eventBus";
import { debounce } from "@/utils";
import Vue from "vue";
import defaultGif from "../assets/default.gif";

let imgs = [];

function setImage(img) {
  img.dom.src = defaultGif; // 先加载默认图片
  // 处理图片
  if (isInViewport(img)) {
    const tempImg = new Image();
    tempImg.onload = function () {
      img.dom.src = img.src;
    };
    tempImg.src = img.src;
    imgs = imgs.filter((i) => i !== img);
  }
  return;
}

// 图片是否在视口内
function isInViewport(img) {
  const rect = img.dom.getBoundingClientRect();
  return rect.top < document.documentElement.clientHeight && rect.bottom > 0;
}

// 调用函数，在合适的时候设置合适的几张图片显示
function setImages() {
  for (const img of imgs) {
    // 处理该图片
    setImage(img);
  }
}

const handleScroll = debounce(setImages, 50);

export default {
  bind(el, bindings) {
    const img = {
      dom: el,
      src: bindings.value,
    };
    imgs.push(img);
    if (imgs.length === 1) {
      // 第一次添加图片时绑定
      eventBus.$on("mainScroll", handleScroll);
    }
    Vue.nextTick(() => setImage(img)); // 页面加载后先处理一遍图片，防止没有触发滚动事件时图片不加载
  },
  unbind(el) {
    imgs = imgs.filter((img) => img.dom !== el);
    if (imgs.length === 0) {
      eventBus.$off("mainScroll", handleScroll);
    }
  },
};
