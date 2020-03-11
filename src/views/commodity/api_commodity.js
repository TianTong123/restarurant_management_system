import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 商品api
const api = {
  //增加商品
  addCommoity: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "commodity",
    params: data
  }),
  //商品列表
  commoityList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "commodity/commodityList",
    isOriginalGET: true,
    params: data
  }),
  //商品列表
  getTypeList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "commodity/typeList",
    isOriginalGET: true,
    params: data
  }),
  //获取单个商品详情
  getCommoityInfo: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "commodity",
    isOriginalGET: true,
    params: data
  }),
  //删除商品
  deleteCommoity: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "commodity/batchDelete",
    params: data
  }),
  //上下架商品
  upOrDownCommoity: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "commodity/batchUpComm",
    params: data
  }),
  //修改商品
  editCommoity: data => req({
    baseUrl: baseUrl,
    method: "put",
    url: "commodity",
    params: data
  }),
}

export default api