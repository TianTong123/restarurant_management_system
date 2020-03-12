import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 权限api
const api = {
  //权限列表
  getRightList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "role/rightList",
    isOriginalGET: true,
    params: data
  }),
  //增加权限
  addRight: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "role/right",
    isOriginalGET: true,
    params: data
  }),
  //编辑
  editRight: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "role/editRight",
    params: data
  }),

}

export default api