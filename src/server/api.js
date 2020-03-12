import { req } from "./req";
import api_login from "@/views/login/api_login";
import api_home from "@/views/home/api_home";
import api_commodity from "@/views/commodity/api_commodity";
import api_account from "@/views/account/api_account";
import api_role from "@/views/role/api_role";
import api_right from "@/views/right/api_right";
import api_order from "@/views/order/api_order";

let api = {
  // Demo Code
  // // 重置个人信息
  // personalReset: data => req({
  //     baseUrl: "osp",
  //     method: "post",
  //     url: "ralAccountSupplier/personalReset",
  //     params: data
  // }),
  // editPassword: data =>req({
  //     baseUrl: "auth",
  //     method: "put",
  //     url: `authUser?userkey=${data.userkey}&tokenkey=${data.tokenkey}`,
  //     params: data
  // }), //修改用户密码
  // getCompanyInfo: data =>
  //   req({
  //     baseUrl: "osp",
  //     method: "get",
  //     url: "tblAccount/companyInfo",
  //     params: data,
  //     isOriginalGET: true
  //   }),
  // 下载文件1
  // downLoadFile: data =>
  //   req({
  //     baseUrl: "osp",
  //     method: "post",
  //     url: "uploadFastdfs/downFile",
  //     params: data
  //   }),
  // // 下载文件
  getFileFlow: data =>
    req({
      baseUrl: "testUrl",
      method: "get",
      url: "osp/tblResumeBase/downloadFlow",
      params: data,
      isOriginalGET: true,
      responseType: "arraybuffer"
    }),
};
api = Object.assign(
  api,
  api_login,
  api_home,
  api_commodity,
  api_account,
  api_role,
  api_right,
  api_order,
);

export default api;
