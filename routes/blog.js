const express = require("express");
const router = express.Router();

// 获得博客列表
router.get("/list", (req, res, next) => {
  let { author, keyword } = req.query;
  res.json({
    errno: 0,
    data: [
      {
        author,
        content: "哈哈哈"
      },
      {
        keyword,
        content: "嘻嘻"
      }
    ]
  });
});

// 获得博客详情
router.get("/detail", (req, res, next) => {
  let { id } = req.query;
  res.json({
    errno: 0,
    data: {
      id,
      content: "恩恩"
    }
  });
});

// 添加博客
router.post("/api/blog/new", (req, res, next) => {});

// 修改博客
router.post("/api/blog/update", (req, res, next) => {});

// 删除博客
router.post("/api/blog/del", (req, res, next) => {});

module.exports = router;
