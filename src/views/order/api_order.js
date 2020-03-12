import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 订单api
const api = {
  //订单列表
  getOrderList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "role/roleList",
    isOriginalGET: true,
    params: data
  }),
}

export default api