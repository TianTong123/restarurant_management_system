import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 商品api
const api = {
  //商品列表
  accoundList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "user/accountList",
    isOriginalGET: true,
    params: data
  }),
}

export default api