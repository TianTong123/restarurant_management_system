import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 登录api
const api = {
  addCommoity: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "commodity",
    params: data
  }), 
}

export default api