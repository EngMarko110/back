const { Product } = require("../../../models/product");
const { Order } = require("../../../models/order");
const updateProductsInputvalidator = require("../../validators/productValidators/updateProductsInputValidator");
async function updateProductsMiddleware(req, res, next) {
    try {
        const isRequestValid = updateProductsInputvalidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        const products = await Product.find().where({ id: { $in: req.body.productIds } });
        if (!products.length) return res.status(404).json({ message: "Products aren't found" });
        res.locals.products = products;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
module.exports = updateProductsMiddleware;
