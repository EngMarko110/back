const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  /*  images: [{
        type: String
    }],*/
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
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
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  /* rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },*/
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  availableLicence: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Licence",
    default: [],
  }],
  soldLicence: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Licence",
    default: [],
  }],
  licenceStock: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

exports.Product = mongoose.model("Product", productSchema);
