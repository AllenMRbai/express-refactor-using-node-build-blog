const { ErrorModel } = require("../model/resModel");

function checklogin(req, res, next) {
  if (!req.session.username) {
    res.json(new ErrorModel("尚未登录"));
  } else {
    next();
  }
}

module.exports = checklogin;
