const { Product } = require("../../models/product");
const { Category } = require("../../models/categories/category");
const { SubCategory } = require("../../models/categories/subCategory");
async function addProductMiddleware(req, res, next) {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send("Invalid Category");
        const subCategory = await SubCategory.findById(req.body.subCategory);
        if (!subCategory) return res.status(400).send("Invalid Sub Category");
        if (!req.file) return res.status(400).send("No image in the request");
        const products = await Product.find().where({ name: req.body.name });
        if (!products.length) next();
        else return res.status(409).json({ message: "Product is already exists with this name!" });
    } catch (error) {
        return res.status(400).json({ message: "Bad Request!" });
    }
}
module.exports = addProductMiddleware;
