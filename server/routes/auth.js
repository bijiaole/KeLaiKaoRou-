const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { User } = require('../models');
const { success, error, serverError } = require('../utils/response');
require('dotenv').config();

const router = express.Router();

/**
 * POST /api/auth/login
 * 微信登录
 */
router.post('/login', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return error(res, '缺少登录code');
    }

    let openid;

    // 开发环境支持测试模式
    if (code === 'test') {
      openid = 'test_openid_123456';
    } else {
      // 调用微信 code2Session 接口
      const wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WX_APPID}&secret=${process.env.WX_SECRET}&js_code=${code}&grant_type=authorization_code`;

      const wxResult = await axios.get(wxUrl);

      if (wxResult.data.errcode) {
        console.error('微信接口错误:', wxResult.data);
        return error(res, `微信登录失败: ${wxResult.data.errmsg}`);
      }

      openid = wxResult.data.openid;

      if (!openid) {
        return error(res, '获取openid失败');
      }
    }

    // 查找或创建用户
    let user = await User.findOne({ where: { openid } });

    if (!user) {
      user = await User.create({
        openid,
        nickname: '微信用户',
        avatar: ''
      });
    }

    // 生成JWT token
    const token = jwt.sign(
      {
        id: user.id,
        openid: user.openid
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return success(res, {
      token,
      userInfo: {
        id: user.id,
        openid: user.openid,
        nickname: user.nickname,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('登录失败:', err);
    return serverError(res, '登录失败');
  }
});

module.exports = router;
