const express = require("express");
const router = express.Router();
const xss = require("xss");
const createError = require("http-errors");

const { login, check, registry } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const checklogin = require("../middleware/checklogin");

// 登录
router.post("/login", (req, res, next) => {
  let { username, password } = req.body;

  if (!username || !password) return res.json(new ErrorModel("必填项不能为空"));

  login(username, password)
    .then(data => {
      if (data.username) {
        console.log(req.session);
        req.session.username = data.username;
        req.session.realname = data.realname;

        res.json(
          new SuccessModel({
            username: data.username,
            realname: data.realname
          })
        );
      } else {
        res.json(new ErrorModel("用户名或密码错误"));
      }
    })
    .catch(err => {
      console.log("捕获到了服务器错误");
      next(createError(500));
    });
});

// 获得用户信息
router.get("/info", checklogin, (req, res, next) => {
  res.json(new SuccessModel({ ...req.session }));
});

// 登出
router.get("/logout", checklogin, (req, res, next) => {
  req.session.username = "";

  res.json(new SuccessModel());
});

// 注册
router.post("/registry", (req, res, next) => {
  let { username, password, realname } = req.body;

  if (!username || !password || !realname)
    return res.json(new ErrorModel("必填项不能为空"));

  username = xss(username);
  realname = xss(realname);

  check(username)
    .then(data => {
      return registry({ username, password, realname });
    })
    .then(data => {
      if (data.affectedRows == 1) {
        // 注册成功 顺便登录
        req.session.username = username;
        req.session.realname = realname;

        res.json(
          new SuccessModel({
            username,
            realname
          })
        );
      } else {
        res.json(new ErrorModel("注册失败"));
      }
    })
    .catch(err => {
      if (err === "registered") {
        res.json(new ErrorModel("该用户已被注册"));
      } else {
        res.json(new ErrorModel("注册失败"));
      }
    });
});

module.exports = router;
