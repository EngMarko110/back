async function updateLicenceInputValidator(req) {
    const { productId, code } = req.body;
    return req.body && req.params.id && productId && code && typeof productId === "string" && typeof code === "string";
}
module.exports = updateLicenceInputValidator;
