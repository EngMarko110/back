async function getLicencesByProductIdInputValidator(req) {
    return req.params.productId && typeof req.params.productId === "string";
}
module.exports = getLicencesByProductIdInputValidator;
