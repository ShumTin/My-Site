import { showMessage } from "@/utils";
import axios from "axios";

const instance = axios.create(); // 创建一个axios实例
instance.interceptors.response.use(function (resp) {
  if (resp.data.code !== 0) {
    showMessage({
      content: resp.data.msg,
      type: "error",
      duration: 1500,
    });
    return null;
  }
  return resp.data.data;
});

export default instance;
