const { Licence } = require("../../../models/licence");
const createLicenceInputValidator = require("../../validators/licenceValidators/createLicenceInputValidator");
async function createLicenceMiddleware(req, res, next) {
    try {
        const isRequestValid = createLicenceInputValidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        const licence = await Licence.findOne({ code: req.body.code });
        if (licence) return res.status(409).json({ message: "This licence is already exists" });
        else next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = createLicenceMiddleware;
