const { Licence } = require("../../../models/licence");
const updateLicenceInputValidator = require("../../validators/licenceValidators/updateLicenceInputValidator");
async function updateLicenceMiddleware(req, res, next) {
    try {
        const isRequestValid = updateLicenceInputValidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        const licence = await Licence.findById(req.params.id);
        if (!licence) return res.status(404).json({ message: "The licence isn't found" });
        else next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = updateLicenceMiddleware;
