const { MainCategory } = require("../models/categories/mainCategory");
const { Category } = require("../models/categories/category");
const { SubCategory } = require("../models/categories/subCategory");
const { Product } = require("../models/product");
const express = require("express");
const parseUrlencoded = express.urlencoded({ extended: true });
const addCategoryMiddleware = require("../utils/middlewares/categoryMiddlewares/addCategoryMiddleware");
const addSubCategoryMiddleware = require("../utils/middlewares/categoryMiddlewares/addSubCategoryMiddleware");
const router = express.Router();
router.get(`/mainCategories`, async (req, res) => {
  try {
    const categoryList = await MainCategory.find();
    return res.status(200).send(categoryList);
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});
router.get("/mainCategories/:id", async (req, res) => {
  try {
    const category = await MainCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "The main category with the given ID was not found." });
    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});
router.post("/mainCategories/new", async (req, res) => {
  try {
    let mainCategory = new MainCategory({ name: req.body.name, icon: req.body.icon, color: req.body.color });
    mainCategory = await mainCategory.save();
    return res.send(mainCategory);
  } catch (error) {
    return res.status(500).send("the main category cannot be created!");
  }
});
router.put("/mainCategories/edit/:id", async (req, res) => {
  try {
    const category = await MainCategory.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, icon: req.body.icon, color: req.body.color },
      { new: true, omitUndefined: true }
    );
    return res.send(category);
  } catch (error) {
    return res.status(400).send("the main category cannot be created!");
  }
});
router.delete("/mainCategories/:id", (req, res) => {
  MainCategory.findByIdAndRemove(req.params.id).then((mainCategory) => {
    if (mainCategory) {
      Category.deleteMany({ mainCategory: req.params.id }).then((category) => {
        if (category) {
          SubCategory.deleteMany({ mainCategory: req.params.id }).then((subCategory) => {
            if (subCategory) {
              Product.deleteMany({ mainCategory: req.params.id }).then((product) => {
                if (product) return res.status(200).json({ success: true, message: "the main category is deleted!" });
              });
            }
          });
        }
      });
    } else {
      return res.status(404).json({ success: false, message: "the main category is not found!" });
    }
  }).catch((err) => {
    return res.status(500).json({ success: false, error: err });
  });
});
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});
router.get("/:id/getAll", async (req, res) => {
  const category = await Category.find().where({ mainCategory: req.params.id });

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found." });
  }
  res.status(200).send(category);
});
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found." });
  }
  res.status(200).send(category);
});

router.post("/", [parseUrlencoded, addCategoryMiddleware], async (req, res) => {
  let category = new Category({
    mainCategory: req.body.mainCategory,
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      mainCategory: req.body.mainCategory,
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true, omitUndefined: true }
  );

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        SubCategory.deleteMany({ category: req.params.id }).then((subCategory) => {
          if (subCategory) {
            Product.deleteMany({ category: req.params.id }).then((product) => {
              if (product) return res.status(200).json({ success: true, message: "the category is deleted!" });
            });
          }
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});
router.get("/:id/subCategories", async (req, res) => {
  const subCategories = await SubCategory.find({
    category: req.params.id,
  });
  if (!subCategories)
    return res.status(500).json({
      message: "The category with the given ID has no sub categories.",
    });
  res.status(200).send(subCategories);
});
router.get("/subCategories/:id", async (req, res) => {
  const subCategories = await SubCategory.findById(req.params.id);
  if (!subCategories)
    return res.status(500).json({ message: "Sub category is not found" });
  return res.status(200).send(subCategories);
});

router.post(
  "/subCategories/new",
  [parseUrlencoded, addSubCategoryMiddleware],
  async (req, res) => {
    let subCategory = new SubCategory({
      mainCategory: req.body.mainCategory,
      category: req.body.category,
      name: req.body.name,
      icon: req.body.icon,
      subicon: req.body.subicon, //subIcon
      color: req.body.color,
    });
    subCategory = await subCategory.save();
    if (!subCategory)
      return res.status(400).send("the subCategory cannot be created");
    res.send(subCategory);
  }
);
router.put("/subCategories/edit/:id", async (req, res) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    {
      mainCategory: req.body.mainCategory,
      category: req.body.category,
      name: req.body.name,
      icon: req.body.icon,
      subicon: req.body.subicon, //subIcon
      color: req.body.color,
    },
    { new: true }
  );
  if (!subCategory)
    return res.status(400).send("the subCategory cannot be updated!");
  res.send(subCategory);
});
router.delete("/subCategories/:id", (req, res) => {
  SubCategory.findByIdAndRemove(req.params.id)
    .then((subCategory) => {
      if (subCategory) {
        Product.deleteMany({ subCategory: req.params.id }).then((product) => {
          if (product) return res.status(200).json({ success: true, message: "the category is deleted!" });
        });
      }
      else
        return res
          .status(404)
          .json({ success: false, message: "subCategory not found!" });
    })
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

module.exports = router;
