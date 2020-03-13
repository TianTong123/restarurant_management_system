import { req } from "./req";
import api_login from "@/views/login/api_login";
import api_home from "@/views/home/api_home";
import api_commodity from "@/views/commodity/api_commodity";
import api_account from "@/views/account/api_account";
import api_role from "@/views/role/api_role";
import api_right from "@/views/right/api_right";
import api_order from "@/views/order/api_order";

let api = {
  
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
