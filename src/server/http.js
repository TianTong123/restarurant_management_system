import axios from 'axios';

/**
 * url: 地址
 * method: 请求方法
 * params: 参数
 * timeout: 超时时间
 * isOriginalGET: 是否传统get传参
 * systemId: 系统id
 * deviceId: 设备编码
 * jwt: 鉴权 token
 * userId: 用户id 
 * logoutCallback: 登出回调
 * changeJwtCallback：换jwt回调
 * noAuthCallback: 无权限访问登录
 * responseType:响应的数据类型 
 */

// 封装请求方法
export const http = ({
    url,
    method,
    params,
    timeout,
    isOriginalGET,
    deviceId,
    lang,
    changeJwtCallback,
    responseType
}) => {

    // axios 默认设置
    axios.defaults.retry = 3;
    axios.defaults.retryDelay = 1000;
    // axios 拦截器
    axios.interceptors.response.use(
        response => {
            //登录失效的时候重定向为登录页面
            if (response.data.code == -11) {
                userLogout()
                return response
            } else if (response.data.code == 21 || response.data.code == -21 || response.data.code == 22) {
                let config = response.config;
                const changeJwt = () => {
                    if (response.data.data) {
                        changeJwtCallback(response.data.data)
                        config.headers.authorization = response.data.data;
                    }
                }

                // 21:更换jwt , 22:频繁F5刷新 更新jwt
                if (response.data.code == 21 || response.data.code == 22) {
                    changeJwt();
                }

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
            } else if (response.data.code == -31) {
                noAuthority()
                return response
            } else {
                return response
            }
        }
    )


    !params && (params = {});
    let config = {
        method: method,
        url: url,
        timeout: 20000,
        headers: {
            'device': 'PC'
        }
    };
    
    // 用来覆盖默认的超时时间
    if (timeout) {
        config.timeout = timeout;
    }
    // 后端判断错误信息返回语言
    if (lang) {
        config.headers.lang = lang;
        config.headers.locale = lang;
    }

    // 设备标识
    if (deviceId) {
        config.headers.deviceId = deviceId;
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

    if(responseType){
        config.responseType = responseType
    }
    
    return axios(config);
}
