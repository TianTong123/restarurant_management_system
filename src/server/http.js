import axios from 'axios';

/**
 * url: 地址
 * method: 请求方法
 * params: 参数
 * timeout: 超时时间
 * isOriginalGET: 是否传统get传参
 * systemId: 系统id
 * jwt: 鉴权 token
 * userId: 用户id 
 * logoutCallback: 登出回调
 * noAuthCallback: 无权限访问登录
 */

// 封装请求方法
export const http = ({
    url,
    method,
    params,
    timeout,
    isOriginalGET,
}) => {
    function myTipConfirm(msg, callback){
        let cfm = confirm(msg);
	    if (cfm==true){
          callback();
          this.$router.push({name: 'login'});
	    }
	    else{
          this.$router.push({name: 'login'});
	    }
    };
    // axios 默认设置
    axios.defaults.retry = 3;
    axios.defaults.retryDelay = 1000;
    // axios 拦截器
    axios.interceptors.response.use(
        response => {
            //登录失效的时候重定向为登录页面
            if (response.data.code == 2) {
                myTipConfirm("登录数据失效，请返回登录页！")
                return response
            }
            else if (response.data.code == 3) {
                myTipConfirm("系统错误！")
                return response
            }else {
                return response
            }
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
    if (config.params) {
        config.params.ts = `${(new Date()).getTime()}`;
    } else {
        config.params = {
            ts: `${(new Date()).getTime()}`
        };
    }
    
    return axios(config);
}
