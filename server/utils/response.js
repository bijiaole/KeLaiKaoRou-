/**
 * 统一响应格式工具
 */

// 成功响应
const success = (res, data = null, msg = 'success') => {
  return res.json({
    code: 200,
    msg,
    data
  });
};

// 错误响应
const error = (res, msg = 'error', code = 400) => {
  return res.json({
    code,
    msg,
    data: null
  });
};

// 未授权响应
const unauthorized = (res, msg = '未登录或登录已过期') => {
  return res.json({
    code: 401,
    msg,
    data: null
  });
};

// 资源不存在响应
const notFound = (res, msg = '资源不存在') => {
  return res.json({
    code: 404,
    msg,
    data: null
  });
};

// 服务器错误响应
const serverError = (res, msg = '服务器内部错误') => {
  return res.json({
    code: 500,
    msg,
    data: null
  });
};

module.exports = {
  success,
  error,
  unauthorized,
  notFound,
  serverError
};
