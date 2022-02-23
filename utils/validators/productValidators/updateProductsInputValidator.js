async function updateProductsInputvalidator(req) {
    const areExist = req.body && req.body.productIds && req.body.orderStatus && req.body.soldKeys;
    const areValidTypes = req.body.productIds.length && req.body.soldKeys.length && typeof req.body.orderStatus === "string";
    let inValidProductIds;
    let inValidSoldKeys;
    if (areExist && areValidTypes) {
        inValidProductIds = req.body.productIds.filter((id) => typeof id !== "string");
        inValidSoldKeys = req.body.soldKeys.filter((key) => typeof key !== "string");
    }
    return !inValidProductIds.length && !inValidSoldKeys.length;
}
module.exports = updateProductsInputvalidator;
