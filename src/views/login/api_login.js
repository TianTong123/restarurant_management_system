import {req}  from "@/server/req";
let baseUrl = 'osp';

// 登录api
const api = {
  //测试代码
  helloWord: data => req({
    baseUrl: "osp",
    method: "get",
    isOriginalGET: true,
    url: "music/helloWorld",
    params: data
  }), 
}

export default api