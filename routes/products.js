const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/categories/category");
const { SubCategory } = require("../models/categories/subCategory");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const parseUrlencoded = express.urlencoded({ extended: true });
const addProductMiddleware = require("../utils/middlewares/addProductMiddleware");
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  } else if (req.query.subCategories) filter = { subCategory: req.query.categories.split(",") };

  const productList = await Product.find(filter)
    .populate("mainCategory")
    .populate("category")
    .populate("subCategory");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("mainCategory")
    .populate("category")
    .populate("subCategory");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post(
  `/`,
  [parseUrlencoded, uploadOptions.single("image"), addProductMiddleware],
  async (req, res) => {
    const file = req.file;
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
      brand: req.body.brand,
      price: req.body.price,
      mainCategory: req.body.mainCategory,
      category: req.body.category,
      subCategory: req.body.subCategory,
      countInStock: req.body.countInStock,
      //  rating: req.body.rating,
      //  numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) return res.status(500).send("The product cannot be created");

    res.send(product);
  }
);

router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");
  const subCategory = await SubCategory.findById(req.body.subCategory);
  if (!subCategory) return res.status(400).send("Invalid Sub Category");
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(400).send("Invalid Product!");

  const file = req.file;
  let imagepath;

  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    imagepath = `${basePath}${fileName}`;
  } else {
    imagepath = product.image;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagepath,
      brand: req.body.brand,
      price: req.body.price,
      mainCategory: req.body.mainCategory,
      category: req.body.category,
      subCategory: req.body.subCategory,
      countInStock: req.body.countInStock,
      //  rating: req.body.rating,
      //  numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true, omitUndefined: true }
  );

  if (!updatedProduct)
    return res.status(500).send("the product cannot be updated!");
  res.send(updatedProduct);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "the product is deleted!",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: productCount,
  });
});

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true, omitUndefined: true }
    );

    if (!product) return res.status(500).send("the gallery cannot be updated!");

    res.send(product);
  }
);

router.delete("/category/:id", (req, res) => {
  Product.deleteMany({
    $or: [{ category: req.params.id }, { subCategory: req.params.id }],
  })
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "the product is deleted!",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

////////////////

router.get("/subCategories/:id/product", async (req, res) => {
  const products = await Product.find({ subCategory: req.params.id });
  if (!products)
    return res.status(500).json({ message: "product is not found" });
  return res.status(200).send(products);
});

///////////////

module.exports = router;
