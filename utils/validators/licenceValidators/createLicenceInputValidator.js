async function createLicenceInputValidator(req) {
    const { productId, code } = req.body;
    return req.body && productId && code && typeof productId === "string" && typeof code === "string";
}
module.exports = createLicenceInputValidator;
