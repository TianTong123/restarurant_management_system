import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 登录api
const api = {
  //测试代码
  test: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "user/testToken",
    params: data
  }), 
}

export default api