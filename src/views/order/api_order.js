import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 订单api
const api = {
  //订单列表
  getOrderList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "main_order/orderList",
    isOriginalGET: true,
    params: data
  }),
  //查看订单
  getOrderInfo: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "main_order",
    isOriginalGET: true,
    params: data
  }),
  //新增订单
  addOrder: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "main_order",
    params: data
  }),
  //删除订单
  deleteOrders: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "main_order/batchDelete",
    params: data
  }),
  //已读订单
  isReadOrders: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "main_order/batchReadOrder",
    params: data
  }),
}

export default api