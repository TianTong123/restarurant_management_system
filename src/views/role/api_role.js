import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 角色权限api
const api = {
  //角色列表
  getRoleList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "role/roleList",
    isOriginalGET: true,
    params: data
  }),
  //获取单个角色信息
  getRole: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "role",
    isOriginalGET: true,
    params: data
  }),
  //新增角色
  addRole: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "role",
    params: data
  }),
  //编辑角色
  editRole: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "role/addRightToRole",
    params: data
  }),
  //停/启用角色
  upOrDownRole: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "role/batchStateUpdate",
    params: data
  }),
}

export default api