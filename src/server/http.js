import axios from 'axios';
import msg from "@/components/myMsg";
import router from "@/router";
import store from "@/store/store";
import util from "@/util/utils";

let myMsg = msg.myMsg;
/**
 * @url 地址
 * @method 请求方法
 * @params 参数
 * @timeout 超时时间
 * @responseType 响应的数据类型
 * @isOriginalGET 是否get传参
 */

// 封装请求方法
export const http = ({
    url,
    method,
    params,
    timeout,
    isOriginalGET,
    responseType,
}) => {
    // axios 默认设置
    axios.defaults.retry = 1;//重试次数
    axios.defaults.retryDelay = 1000;//重试延迟
  
    // axios response拦截器
    axios.interceptors.response.use(
      response => {
        //登录失效的时候重定向为登录页面
        if(response.data.code == 2){
          myMsg.confirm({
            type: 'error',
            content: '用户数据失效！点确定返回登录页',
            callback: ()=>{
              router.replace({name: 'login'})
            }
          })
          return response
        }else if(response.data.code == 3){
          myMsg.confirm({
            type: 'error',
            content: '系统错误！',
          })
          return response
        }else {
          let config = response.config;
          return response
        }
      },
      //接口错误状态处理
      error => {
        myMsg.confirm({
          type: 'error',
          content: "这个错误，是后台的锅！",//显示返回的错误信息
        })
        return error
      }
    )

    !params && (params = {});
    let config = {
      method: method,
      url: url,
      timeout: 20000,
      headers: {}
    };
    
    // 用来覆盖默认的超时时间
    if (timeout) {
      config.timeout = timeout;
    }
    
    let token = util.getSession("token");
    console.log("-->",token)
    if (token) {
      config.headers.uid = util.getSession("user").accountCode;
      config.headers.token = token;
    }
    
 


    //get方法拼接参数
    method = method.toUpperCase();
    if (method == 'GET') {
      if (isOriginalGET) {
        config.params = params;
      } else {
        // 有参数才在地址后面拼字符串
        if(Object.keys(params).length > 0){
            config.url += `/${encodeURIComponent(JSON.stringify(params))}`;
        }
      }
    } else {
      config.data = params;
    }

    //在请求地址后面加时间戳
    if(config.params){
      config.params.ts = `${(new Date()).getTime()}`;
    } else {
      config.params = {
        ts: `${(new Date()).getTime()}`
      };
    }
    
    //请求返回类型
    if(responseType){
      config.responseType = responseType
    }
    return axios(config);
}
