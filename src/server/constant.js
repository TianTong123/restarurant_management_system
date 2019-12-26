import apienv from "./env";

//检测客户端
let userAgent =
  window.navigator.userAgent.toLowerCase().indexOf("electron") > -1
    ? "pc"
    : "web";

// 全局变量
const constant = {
  // 程序版本号
  appVersion: "1.0.1",
  // 程序环境(app|qas|dev)
  appenv: userAgent == "pc" ? remote.getGlobal("appenv") : "dev",
  // 用户id
  userId: "",
  // 用户姓名
  userName: "",
  // 用户姓名
  // token
  token: "",
  //账号
  account: "",
  //账号类型
  accountType: "",
  //手机号
  phone: "",
  //用户对象
  user: {},
  // 浏览器信息
  userAgent: userAgent,
};
export default constant;
