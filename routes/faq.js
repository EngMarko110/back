const express = require("express");
const router = express.Router();
const {
  createFaq,
  updateFaq,
  deleteFaq,
  getAllFaqs,
  getSingleFaq,
} = require("../controllers/seo");

router.route("/").get(getAllFaqs).post(createFaq);
router.route("/:id").get(getSingleFaq).put(updateFaq).delete(deleteFaq);

module.exports = router;
