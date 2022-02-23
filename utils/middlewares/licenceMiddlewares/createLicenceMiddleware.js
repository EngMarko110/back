const { Licence } = require("../../../models/licence");
const { Product } = require("../../../models/product");
const createLicenceInputValidator = require("../../validators/licenceValidators/createLicenceInputValidator");
async function createLicenceMiddleware(req, res, next) {
    try {
        const isRequestValid = createLicenceInputValidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        const product = await Product.findById(req.body.product);
        if (!product) return res.status(404).json({ message: "Product isn't found by productId" });
        const licence = await Licence.findOne({ code: req.body.code });
        if (licence) return res.status(409).json({ message: "This licence is already exists" });
        else next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = createLicenceMiddleware;
