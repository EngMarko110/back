const mongoose = require("mongoose");
const licenceSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    code: { type: String, required: true },
    sold: { type: Boolean, default: false },
});
licenceSchema.virtual("id").get(function () { return this._id.toHexString(); });
licenceSchema.set("toJSON", { virtuals: true });
exports.Licence = mongoose.model("Licence", licenceSchema);
