import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 统计api
const api = {
  //销售额统计
  getSalesVolume: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "main_order/saleCount",
    isOriginalGET: true,
    params: data
  }), 
}

export default api