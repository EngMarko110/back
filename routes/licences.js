const express = require("express");
const { Licence } = require("../models/licence");
const router = express.Router();
const parseUrlencoded = express.urlencoded({ extended: true });
const getLicencesByProductIdMiddleware = require("../utils/middlewares/licenceMiddlewares/getLicencesByProductIdMiddleware");
const getOrDeleteLicenceByIdMiddleware = require("../utils/middlewares/licenceMiddlewares/getOrDeleteLicenceByIdMiddleware");
const createLicenceMiddleware = require("../utils/middlewares/licenceMiddlewares/createLicenceMiddleware");
const updateLicenceMiddleware = require("../utils/middlewares/licenceMiddlewares/updateLicenceMiddlware");
const updateLicencesMiddleware = require("../utils/middlewares/licenceMiddlewares/updateLicencesMiddlware");
router.get("/:productId/all", [parseUrlencoded, getLicencesByProductIdMiddleware], async (req, res) => {
  try {
    const licences = await Licence.find().where({ product: req.params.productId });
    return res.status(200).json(licences);
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
router.get("/:id", [parseUrlencoded, getOrDeleteLicenceByIdMiddleware], async (req, res) => {
  try {
    const licence = await Licence.findById(req.params.id).populate("product");
    if (!licence) return res.status(404).json({ message: "licence isn't found" });
    return res.status(200).json(licence);
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
router.post("/new", [parseUrlencoded, createLicenceMiddleware], async (req, res) => {
  try {
    const licence = await Licence.create(req.body);
    return res.send(licence);
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
router.put("/edit/:id", [parseUrlencoded, updateLicenceMiddleware], async (req, res) => {
  try {
    const licence = await Licence.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, message: "licence is updated successfully", licence });
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
router.put("/edit/many/order", [parseUrlencoded, updateLicencesMiddleware], async (req, res) => {
  try {
    const soldKeys = req.body.soldKeys;
    const sold = req.body.orderStatus === "3" ? true : false;
    Licence.updateMany({ _id: { $in: soldKeys } }, { $set: { sold } }, { new: true, omitUndefined: true, multi: true }).then(result => {
      return res.status(200).json({ message: "Licence is updated", success: true });
    }).catch(err => res.status(400).json({ msg: err.message }));
  } catch (error) {
    return res.status(500).json({ message: "Licence can't be updated" });
  }
});
router.delete("/:id", [parseUrlencoded, getOrDeleteLicenceByIdMiddleware], async (req, res) => {
  try {
    const deletedLicence = await Licence.findByIdAndRemove(req.params.id);
    if (!deletedLicence) return res.status(404).json({ message: "licence isn't found" });
    return res.status(200).json({ success: true, message: "licence is deleted successfully" });
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
module.exports = router;
