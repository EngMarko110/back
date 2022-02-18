const express = require("express");
const { Licence } = require("../models/licence");
const router = express.Router();
const parseUrlencoded = express.urlencoded({ extended: true });
const getLicencesByProductIdMiddleware = require("../utils/middlewares/licenceMiddlewares/getLicencesByProductIdMiddleware");
const getOrDeleteLicenceByIdMiddleware = require("../utils/middlewares/licenceMiddlewares/getOrDeleteLicenceByIdMiddleware");
const createLicenceMiddleware = require("../utils/middlewares/licenceMiddlewares/createLicenceMiddleware");
const updateLicenceMiddleware = require("../utils/middlewares/licenceMiddlewares/updateLicenceMiddlware");
router.get("/:productId", [parseUrlencoded, getLicencesByProductIdMiddleware], async (req, res) => {
  try {
    const licences = await Licence.find().where({ productId: req.params.productId });
    return res.status(200).json(licences);
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
router.get("/:productId/:id", [parseUrlencoded, getOrDeleteLicenceByIdMiddleware], async (req, res) => {
  try {
    const licence = await Licence.findById(req.params.id);
    if (!licence) return res.status(404).json({ message: "licence isn't found" });
    return res.status(200).json(licence);
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
router.post("/new", [parseUrlencoded, createLicenceMiddleware], async (req, res) => {
  try {
    const licence = await Licence.create(req.body);
    return res.status(201).json(licence);
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
router.put("/edit/:id", [parseUrlencoded, updateLicenceMiddleware], async (req, res) => {
  try {
    const licence = await Licence.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, message: "licence is updated successfully", licence });
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
router.delete("/:productId/:id", [parseUrlencoded, getOrDeleteLicenceByIdMiddleware], async (req, res) => {
  try {
    const licence = await Licence.findByIdAndRemove(req.params.id);
    if (!licence) return res.status(404).json({ message: "licence isn't found" });
    return res.status(200).json({ success: true, message: "licence is deleted successfully" });
  } catch (error) { return res.status(500).json({ success: false, error }); }
});
module.exports = router;
