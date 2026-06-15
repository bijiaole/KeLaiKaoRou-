const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/response');
require('dotenv').config();

/**
 * JWT鉴权中间件
 */
const authMiddleware = (req, res, next) => {
  // 从请求头获取token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return unauthorized(res, '请先登录');
  }

  const token = authHeader.split(' ')[1];

  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 将用户信息挂载到req对象
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return unauthorized(res, '登录已过期，请重新登录');
    }
    return unauthorized(res, '无效的登录凭证');
  }
};

module.exports = authMiddleware;
