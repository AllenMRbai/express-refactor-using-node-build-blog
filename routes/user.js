const express = require("express");
const router = express.Router();

// 登录
router.post("/login", (req, res, next) => {
  let { username, password } = req.body;
  res.json({
    errno: 0,
    data: {
      username,
      password
    }
  });
});

// 获得用户信息
router.get("/info", (req, res, next) => {});

// 注册
router.post("/registry", (req, res, next) => {});

module.exports = router;
