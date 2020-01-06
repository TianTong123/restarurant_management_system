import apienv from "./env";
import { http } from "./http";


/**
 * @url 地址
 * @method 请求方法
 * @params 参数
 * @timeout 超时时间
 * @isLogin 是否登录接口
 * @isOriginalGET 是否传统get传参
 */
const req = ({
  baseUrl,
  method,
  url,
  params,
  timeout,
  isOriginalGET,
  responseType,
}) => {
  let options = {
    url: apienv.dev.baseUrl + url,//拼接地址
    method: method,
    params: params,
    timeout: timeout,
    responseType,
    isOriginalGET: isOriginalGET,
  };
  return http(options);
};

export { req };
