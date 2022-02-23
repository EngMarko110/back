async function getOrDeleteLicenceByIdInputValidator(req) {
    return req.params.id && typeof req.params.id === "string";
}
module.exports = getOrDeleteLicenceByIdInputValidator;
