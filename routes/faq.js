const express = require("express");
const router = express.Router();
const {
  createFaq,
  updateFaq,
  deleteFaq,
  getAllFaqs,
} = require("../controllers/seo");

router.route("/faq").get(getAllFaqs).post(createFaq);
router.route("/faq/:id").put(updateFaq).delete(deleteFaq);
module.exports = router;
