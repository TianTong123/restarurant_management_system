import apienv from "./env";
import constant from "@/public/constant";
import router from "../router";
import store from "../store";
import _utils from "@/public/utils";
import { http } from "./http";

const env = apienv[constant.appenv];
/**
 * url: 地址
 * method: 请求方法
 * params: 参数
 * timeout: 超时时间
 * isLogin:是否登录接口
 * isOriginalGET: 是否传统get传参
 */

const logoutCallback = () => {
  const goLogin = () => {
    // 清除 token
    let userData = _utils.getSession("userData");
    userData.jwt = null;
    _utils.saveSession("userData", userData);
    store.commit("loginOut");
    if (constant.userAgent == "web") {
      // 返回 Electorn 窗口
      sendMain("openLoginWin");
    } else {
      // 跳转登录页
      router.push("/login");
    }
  };
  MessageBox.alert(info, {
    showClose: false,
    confirmButtonText: "确定",
    customClass: "boxError",
    callback: () => {
      goLogin();
    }
  });
};
// 修改token
const changeJwtCallback = jwt => {
  let userData = _utils.getSession("userData");
  userData.jwt = jwt;
  _utils.saveSession("userData", userData);
};

// 接口无权限回调
const noAuthCallback = info => {
  MessageBox.alert(info, {
    showClose: false,
    confirmButtonText: "确定",
    customClass: "boxError"
  });
};

const req = ({
  baseUrl,
  method,
  url,
  params,
  timeout,
  isLogin,
  isOriginalGET,
  responseType
}) => {
  let options = {
    url: env[baseUrl] + url,
    method: method,
    params: params,
    timeout: timeout,
    isOriginalGET: isOriginalGET,
    systemId: constant.systemId,
    deviceId: window.fingerprint,
    logoutCallback: logoutCallback,
    changeJwtCallback: changeJwtCallback,
    noAuthCallback: noAuthCallback,
    responseType
  };
  // 非登录接口加鉴权
  let userData = _utils.getSession("userData");
  if (!isLogin && userData.jwt) {
    options.jwt = userData.jwt;
    options.userId = userData.user.id;
  }
  return http(options);
};
export { req };
