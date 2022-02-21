const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSinglePost,
} = require("../controllers/seo");

router.route("/blog").get(getAllBlogs).post(createBlog);

router.route("/blog/:id").get(getSinglePost).put(updateBlog).delete(deleteBlog);

module.exports = router;
