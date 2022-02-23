const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "You have to provide a blog title"],
      unique: true,
    },
    topic: {
      type: String,
      required: [true, "You have to enter a blog topic."],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", BlogSchema);
