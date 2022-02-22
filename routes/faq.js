const express = require("express");
const router = express.Router();
const {
  createFaq,
  updateFaq,
  deleteFaq,
  getAllFaqs,
} = require("../controllers/seo");

router.route("/").get(getAllFaqs).post(createFaq);
router.route("/:id").put(updateFaq).delete(deleteFaq);
module.exports = router;
