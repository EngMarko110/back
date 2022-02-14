const mongoose = require("mongoose");
const subCategorySchema = mongoose.Schema({
  mainCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainCategory",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  name: { type: String, required: true },
  //
  icon: {
    type: String,
  },
  subicon: {
    ////SubIcon
    type: String,
  },
  color: {
    type: String,
  },
  //
});

subCategorySchema.virtual("id").get(function () { return this._id.toHexString(); });
subCategorySchema.set("toJSON", { virtuals: true });
exports.SubCategory = mongoose.model("SubCategory", subCategorySchema);
