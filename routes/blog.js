const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSinglePost,
} = require("../controllers/seo");

router.route("/").get(getAllBlogs).post(createBlog);

router.route("/:id").get(getSinglePost).put(updateBlog).delete(deleteBlog);

module.exports = router;
