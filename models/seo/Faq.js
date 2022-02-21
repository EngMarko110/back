const mongoose = require("mongoose");
const FaqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "You have to provide a Faq title"],
      unique: true,
    },
    topic: {
      type: String,
      required: [true, "You have to enter a Faq topic."],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Faq", FaqSchema);
