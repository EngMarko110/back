const { SubCategory } = require("../../models/categories/subCategory");
async function addSubCategoryMiddleware(req, res, next) {
    try {
        const subCategories = await SubCategory.find().where({ name: req.body.name });
        if (!subCategories.length) next();
        else return res.status(409).json({ message: "Sub Category is already exists with this name!" });
    } catch (error) {
        return res.status(400).json({ message: "Bad Request!" });
    }
}
module.exports = addSubCategoryMiddleware;
