const { Category } = require("../../models/category");
async function addCategoryMiddleware(req, res, next) {
    try {
        const categories = await Category.find().where({ name: req.body.name });
        if (!categories.length) next();
        else return res.status(409).json({ message: "Category is already exists with this name!" });
    } catch (error) {
        return res.status(400).json({ message: "Bad Request!" });
    }
}
module.exports = addCategoryMiddleware;
