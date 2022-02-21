const Blog = require("../models/seo/Blog");
const Faq = require("../models/seo/Faq");

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogs);
};
const getSinglePost = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  res.status(200).json(blog);
};
const getAllFaqs = async (req, res) => {
  const faqs = await Faq.find({}).sort({ createdAt: -1 });
  res.status(200).json(faqs);
};

const createBlog = async (req, res) => {
  const { title, topic } = req.body;
  try {
    const post = await Blog.create({ title, topic });
    res.status(201).json({ msg: "success Posting..", post });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ msg: "this title is already existed" });
    res.status(400).json({ msg: error.message });
  }
};
const createFaq = async (req, res) => {
  const { title, topic } = req.body;
  try {
    const faq = await Faq.create({ title, topic });
    res.status(201).json({ msg: "success Posting..", faq });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ msg: "this title is already existed" });
    res.status(400).json({ msg: error.message });
  }
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, topic } = req.body;
  try {
    await Blog.findByIdAndUpdate(id, { title, topic });
    res.status(201).json({ msg: "success Update.." });
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateFaq = async (req, res) => {
  const id = req.params.id;
  const { title, topic } = req.body;
  try {
    await Faq.findByIdAndUpdate(id, { title, topic });
    res.status(201).json({ msg: "success Update.." });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndRemove(id);
    res.status(201).json({ msg: "success delete.." });
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteFaq = async (req, res) => {
  const id = req.params.id;
  try {
    await Faq.findByIdAndRemove(id);
    res.status(201).json({ msg: "success delete.." });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = {
  createBlog,
  createFaq,
  updateBlog,
  updateFaq,
  deleteBlog,
  deleteFaq,
  getAllBlogs,
  getAllFaqs,
  getSinglePost,
};
