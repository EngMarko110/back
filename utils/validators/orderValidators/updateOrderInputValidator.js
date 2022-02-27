async function updateOrderInputValidator(req) {
    return req.params.id && req.body.status && typeof req.params.id === "string" && typeof req.body.status === "string";
}
module.exports = updateOrderInputValidator;
