const getOrDeleteLicenceByIdInputValidator = require("../../validators/licenceValidators/getOrDeleteLicenceByIdInputValidator");
async function getOrDeleteLicenceByIdMiddleware(req, res, next) {
    try {
        const isRequestValid = getOrDeleteLicenceByIdInputValidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        else next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = getOrDeleteLicenceByIdMiddleware;
