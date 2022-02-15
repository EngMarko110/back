const mongoose = require("mongoose");
const mainCategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  color: { type: String },
});
mainCategorySchema.virtual("id").get(function () { return this._id.toHexString(); });
mainCategorySchema.set("toJSON", { virtuals: true });
exports.MainCategory = mongoose.model("MainCategory", mainCategorySchema);
