



const express = require("express");
const {
  addBrands,
  getBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../services/brandService");
const {
  getBrandByIDValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} = require("../utils/validator/brandValidator");

const router = express.Router();

router
  .route("/")
  .get(getBrand)
  .post( uploadBrandImage, resizeImage, createBrandValidator,addBrands);
router
  .route("/:id")
  .get(getBrandByIDValidator, getBrandById)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
