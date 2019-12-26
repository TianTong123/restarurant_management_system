import apienv from "./env";
import constant from "./constant";
import router from "@/router";
import store from "@/store/store.js";
import util from "@/util/utils";
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
const req = ({
  baseUrl,
  method,
  url,
  params,
  timeout,
  isOriginalGET,
  responseType
}) => {
  let options = {
    url: env[baseUrl] + url,//拼接地址
    method: method,
    params: params,
    timeout: timeout,
    isOriginalGET: isOriginalGET,
    systemId: constant.systemId,
    deviceId: window.fingerprint,
    responseType
  };
  return http(options);
};

export { req };
