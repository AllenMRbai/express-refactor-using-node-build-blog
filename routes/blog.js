const createError = require("http-errors");
const xss = require("xss");
const express = require("express");
const router = express.Router();

const {
  getBlogList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const checklogin = require("../middleware/checklogin");

// 获得博客列表
router.get("/list", (req, res, next) => {
  let { author, keyword } = req.query;
  getBlogList(author, keyword)
    .then(data => {
      res.json(new SuccessModel(data));
    })
    .catch(err => {
      next(createError(500));
    });
});

// 获得博客详情
router.get("/detail", (req, res, next) => {
  let { id } = req.query;

  getDetail(id)
    .then(data => {
      res.json(new SuccessModel(data));
    })
    .catch(err => {
      next(createError(500));
    });
});

// 添加博客
router.post("/new", checklogin, (req, res, next) => {
  let { title, content } = req.body;
  let { username: author } = req.session;

  if (!title || !content || !author)
    return res.json(new ErrorModel("必填项不能为空"));

  title = xss(title);
  content = xss(content);

  newBlog({ title, content, author })
    .then(data => {
      if (data.affectedRows == 1) {
        res.json(new SuccessModel({ id: data.insertId }));
      } else {
        res.json(new ErrorModel("创建失败"));
      }
    })
    .catch(err => {
      next(createError(500));
    });
});

// 修改博客
router.post("/update", checklogin, (req, res, next) => {
  let { title, content, id } = req.body;
  let { username: author } = req.session;

  if (!id) return res.json(new ErrorModel("id不能为空"));

  title = xss(title);
  content = xss(content);

  updateBlog({ title, content, author, id }).then(data => {
    if (data.affectedRows == 1) {
      res.json(new SuccessModel("更新成功"));
    } else {
      res.json(new ErrorModel("更新博客失败"));
    }
  });
});

// 删除博客
router.post("/del", (req, res, next) => {
  let { id } = req.body;
  let { username: author } = req.session;

  delBlog(id, author).then(data => {
    if (data.affectedRows == 1) {
      res.json(new SuccessModel("删除成功"));
    } else {
      res.json(new ErrorModel("删除失败"));
    }
  });
});

module.exports = router;
