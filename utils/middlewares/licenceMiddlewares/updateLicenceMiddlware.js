const { Licence } = require("../../../models/licence");
const { Product } = require("../../../models/product");
const updateLicenceInputValidator = require("../../validators/licenceValidators/updateLicenceInputValidator");
async function updateLicenceMiddleware(req, res, next) {
    try {
        const isRequestValid = updateLicenceInputValidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        let licence = await Licence.findById(req.params.id);
        if (!licence) return res.status(404).json({ message: "The licence isn't found" });
        const product = await Product.findById(req.body.product);
        if (!product) return res.status(404).json({ message: "Product isn't found by productId" });
        licence = await Licence.findOne({ code: req.body.code });
        if (licence) return res.status(409).json({ message: "A licence is already exists with the same code" });
        else next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = updateLicenceMiddleware;
