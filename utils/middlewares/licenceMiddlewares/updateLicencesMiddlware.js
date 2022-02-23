const updateLicencesInputValidator = require("../../validators/licenceValidators/updateLicencesInputValidator");
async function updateLicencesMiddleware(req, res, next) {
    try {
        const isRequestValid = updateLicencesInputValidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        else next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = updateLicencesMiddleware;
