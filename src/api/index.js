import axios from "axios";
import config, { URL } from "@/api/config";

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // if (!config.data.user_name) {
    //   config.data = {
    //     ...config.data,
    //     user_name: localStorage.getItem("uid")
    //   };
    // }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // console.log(response);
    // 对响应数据做点什么
    // if (response.data.result.Code === ERR_ESC) {
    //   // 验证400
    //   window.location.href = escUrl;
    // }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default class API {
  /**
   * 首页相关
   */
  // 首页信息
  getHome(param) {
    config.data = param;
    return axios.post(`${URL}/index`, {}, config);
  }
  /**
   * 操作管理
   */
  // 日志分页列表
  getLogList(param) {
    config.data = param;
    return axios.post(`${URL}/logday`, {}, config);
  }
  // 日期当日详情
  getLogDetail(param) {
    config.data = param;
    return axios.post(`${URL}/logday_diel`, {}, config);
  }
  // 获取地址列表
  getAddressList(param) {
    config.data = param;
    return axios.post(`${URL}/token_addresslist`, {}, config);
  }
  // 添加地址
  addAddress(param) {
    config.data = param;
    return axios.post(`${URL}/token_address_add`, {}, config);
  }
  // 获取用户余额
  getBalance(param) {
    config.data = param;
    return axios.post(`${URL}/getcashshow`, {}, config);
  }
  // 提现操作
  withDraw(param) {
    config.data = param;
    return axios.post(`${URL}/subcashdata`, {}, config);
  }
  // 提现记录
  withDrawResult(param) {
    config.data = param;
    return axios.post(`${URL}/getcashlist`, {}, config);
  }
  // 获取奖励列表
  getBonusList(param) {
    config.data = param;
    return axios.post(`${URL}/zonglog`, {}, config);
  }
  // 获取奖励明细
  getBonusDetail(param) {
    config.data = param;
    return axios.post(`${URL}/logday_diel_type`, {}, config);
  }
  /**
   * 用户相关
   */
  // 身份验证
  AUTZ(parma) {
    config.data = parma;
    return axios.post(`${URL}/token_check`, {}, config);
  }
  // 登录
  login(param) {
    config.data = param;
    return axios.post(`${URL}/login`, {}, config);
  }
  // 退出登陆
  logout(param) {
    config.data = param;
    return axios.post(`${URL}/login`, {}, config);
  }
  // 获取注册验证码
  getRegCode(param) {
    config.data = param;
    return axios.post(`${URL}/registerphonecode`, {}, config);
  }
  // 普通注册
  normalReg(param) {
    config.data = param;
    return axios.post(`${URL}/register_nomal`, {}, config);
  }
  // 经销商注册
  dealerReg(param) {
    config.data = param;
    return axios.post(`${URL}/register_seller`, {}, config);
  }
  // 获取修改验证码
  getVcode(param) {
    config.data = param;
    return axios.post(`${URL}/passwordphonecode`, {}, config);
  }
  // 验证密码验证码
  checkVcode(param) {
    config.data = param;
    return axios.post(`${URL}/repasswordphonecode`, {}, config);
  }
  // 修改登陆密码
  changePwd(param) {
    config.data = param;
    return axios.post(`${URL}/changepwd`, {}, config);
  }
  // 修改安全密码
  changeScy(param) {
    config.data = param;
    return axios.post(`${URL}/changerepwd`, {}, config);
  }
}
