import { req } from "./req";
let api = {
  // 重置个人信息
  personalReset: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "ralAccountSupplier/personalReset",
      params: data
    }),
  //重置密码接口
  resetPassword: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "ralAccountSupplier/resetPassword",
      params: data
    }), //重置密码接口
  login: data =>
    req({
      baseUrl: "auth",
      method: "post",
      url: "account/login",
      params: data,
      isLogin: true
    }), //登录新接口
  retrievePassword: data =>
    req({
      baseUrl: "auth",
      method: "get",
      url: "account/retrieve",
      params: data,
      isLogin: false,
      isOriginalGET: true
    }), //重置密码Idm接口
  modifyPassword: data =>
    req({
      baseUrl: "auth",
      method: "get",
      url: "account/modifypwd",
      params: data,
      isLogin: false,
      isOriginalGET: true
    }), //修改密码Idm接口
  getTimestamp: data =>
    req({
      baseUrl: "auth",
      method: "post",
      url: "account/getTimeStamp",
      params: data
    }), //获取服务器时间戳
  userLogout: data =>
    req({
      baseUrl: "auth",
      method: "post",
      url: "account/exit",
      params: data
    }), //用户退出登录,
  getToken: data =>
    req({
      baseUrl: "auth",
      method: "get",
      url: "account/register",
      params: data,
      isLogin: false,
      isOriginalGET: true
    }), //获取登录token
  validatePassword: data =>
    req({
      baseUrl: "auth",
      method: "post",
      url: "account/authenticate",
      params: data
    }), //验证旧密码
  editPassword: data =>
    req({
      baseUrl: "auth",
      method: "put",
      url: `authUser?userkey=${data.userkey}&tokenkey=${data.tokenkey}`,
      params: data
    }), //修改用户密码
  editPasswordIdm: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "ralAccountSupplier/updatePassword",
      params: data
    }), //修改用户密码idm
  // 手机号登录接口
  loginByPhone: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "tblAccount/loginByPhone",
      params: data
    }),
  saveCustomStyle: data =>
    req({
      baseUrl: "auth",
      method: "post",
      url: "account/saveTableStyle",
      params: data
    }), //保存agGrid自定义样式 2019-05-02
  getCustomClassStyle: data =>
    req({
      baseUrl: "auth",
      method: "post",
      url: "account/getTableStyle",
      params: data
    }), //获取agGrid自定义样式 2019-05-02
  //根据登录账号获取数据菜单
  getMenu: data =>
    req({
      baseUrl: "auth",
      method: "post",
      url: "authResource/getUserAuthResource",
      params: data
    }),
  //获取服务器时间
  getServerTime: data =>
    req({
      baseUrl: "osp",
      method: "get",
      url: "mstCompany/getServerTime",
      params: data
    }),
  //获取验证码
  sendAuthCode: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "tblAccount/sendVerification",
      params: data
    }),
  // 校验验证码
  checkAuthCode: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "tblAccount/checkVerification",
      params: data
    }),
  // 注册账户
  registerAccount: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "tblAccount/register",
      params: data
    }),
  // 获取用户公司详情
  getCompanyInfo: data =>
    req({
      baseUrl: "osp",
      method: "get",
      url: "tblAccount/companyInfo",
      params: data,
      isOriginalGET: true
    }),
  //  获取企业基本信息
  getCompanyBasicInfo: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "tblEnterpriseInfo/get",
      params: data
      // isOriginalGET:true
    }),
  //   更新公司审核状态
  updateCompanyState: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "tblEnterpriseInfo/update",
      params: data
    }),
  // 下载文件
  downLoadFile: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "uploadFastdfs/downFile",
      params: data
    }),
  // 下载文件
  getFileFlow: data =>
    req({
      baseUrl: "osp",
      method: "get",
      url: "tblResumeBase/downloadFlow",
      params: data,
      isOriginalGET: true,
      responseType: "arraybuffer"
    }),
  // 验证用户登录类型
  checkUserTypeAccount: data =>
    req({
      baseUrl: "osp",
      method: "post",
      url: "tblAccount/checkUserTypeAccount",
      params: data
    }),
  // 首页展示数据获取
  getPartyAHomeData: data =>
    req({
      baseUrl: "osp",
      method: "get",
      url: "homeReport/partAHome",
      params: data,
      isOriginalGET: true
    })
};
api = Object.assign(
  api,

);

export default api;
