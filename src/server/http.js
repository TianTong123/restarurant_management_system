import axios from 'axios';
import msg from "@/components/myMsg"

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
    axios.defaults.retry = 3;//重试次数
    axios.defaults.retryDelay = 1000;//重试延迟

    // axios request拦截器
    // axios.instance.interceptors.request.use(
    //   config => {
    //     if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    //       config.headers.authorization = store.state.token  //请求头加上token
    //     }
    //     return config
    //   },
    //   err => {
    //     return Promise.reject(err)
    // })
  
    // axios response拦截器
    axios.interceptors.response.use(
      response => {
        //登录失效的时候重定向为登录页面
        if(response.data.code == 2){
          msg.confirmMessage({
            type: 'error',
            content: '用户数据失效！点确定返回登录页',
            callback: ()=>{this.$router.replace({name: 'login'})}
          })
          return response
        }else if(response.data.code == 3){
          msg.confirmMessage({
            type: 'error',
            content: '系统错误！',
          })
          return response
        }else {
          let config = response.config;
          // 判断是否配置了重试      
          if (!config || !config.retry) return response;
          // 设置重置次数，默认为0      
          config.__retryCount = config.__retryCount || 0;
          // 判断是否超过了重试次数      
          if (config.__retryCount >= config.retry) {
              userLogout()
              return response
          }
          config.__retryCount += 1;
          // 延时
          var backoff = new Promise(function(resolve) {
              setTimeout(function() {
                  resolve();
              }, config.retryDelay || 1);
          });

          //重新发起axios请求              
          return backoff.then(function() {
              // var authorization = jwt;
              // if (authorization) {
              //     config.headers.authorization = authorization;
              // }
              return axios(config);
          });
          return response
        }
      },
      //接口错误状态处理
      error => {
        msg.confirmMessage({
          type: 'error',
          content: resizeBy.data.msg,//显示返回的错误信息
        })
        return error
      }
    )

    !params && (params = {});
    let config = {
      method: method,
      url: url,
      timeout: 20000,
    };
    
    // 用来覆盖默认的超时时间
    if (timeout) {
      config.timeout = timeout;
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
