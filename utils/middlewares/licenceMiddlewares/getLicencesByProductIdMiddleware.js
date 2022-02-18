const getLicencesByProductIdInputValidator = require("../../validators/licenceValidators/getLicencesByProductIdInputValidator");
async function getLicencesByProductIdMiddleware(req, res, next) {
    try {
        const isRequestValid = getLicencesByProductIdInputValidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        else next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = getLicencesByProductIdMiddleware;
