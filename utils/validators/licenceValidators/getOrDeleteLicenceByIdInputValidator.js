async function getOrDeleteLicenceByIdInputValidator(req) {
    return req.params.productId && req.params.id && typeof req.params.productId === "string" && typeof req.params.id === "string";
}
module.exports = getOrDeleteLicenceByIdInputValidator;
