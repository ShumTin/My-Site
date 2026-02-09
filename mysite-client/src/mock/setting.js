import Mock from "mockjs";
import avatarUrl from "@/assets/avatar.jpg";
import qqQrCode from "@/assets/qq-qrcode.png";
import weixinQrCode from "@/assets/wechat-qrcode.png";

Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: avatarUrl,
    siteTitle: "ShumTin",
    github: "https://github.com/ShumTin",
    qq: "970206989",
    qqAddContact: "https://qm.qq.com/q/qhO6vpBofQ",
    qqQrCode,
    weixin: "ccchtinnn-",
    weixinQrCode,
    mail: "shumtin0216@gmail.com",
    icp: "备案号XXXX",
    githubName: "ShumTin",
    favicon: avatarUrl,
  },
});
