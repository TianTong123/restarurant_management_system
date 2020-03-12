import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 账号api
const api = {
  //账号列表
  accountList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "user/accountList",
    isOriginalGET: true,
    params: data
  }),
  //查看账号
  viewAccount: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "role/accountRoleList",
    isOriginalGET: true,
    params: data
  }),
  //增加账号
  addAccount: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "user/addAccount",
    isOriginalGET: true,
    params: data
  }),
  //编辑账号
  editAccount: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "user/updateAccount",
    params: data
  }),
  //编辑账号角色
  editAccountRight: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "role/addRoleToAccount",
    params: data
  }),
}

export default api