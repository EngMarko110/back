async function updateLicencesInputValidator(req) {
    const { orderStatus, soldKeys } = req.body;
    const isValidInputs = req.body && orderStatus && soldKeys && typeof orderStatus === "string" && soldKeys.length;
    let inValidSoldKeys;
    if (isValidInputs) inValidSoldKeys = soldKeys.filter((key) => typeof key !== "string");
    return isValidInputs && inValidSoldKeys && !inValidSoldKeys.length;
}
module.exports = updateLicencesInputValidator;
