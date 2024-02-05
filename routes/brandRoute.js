const express = require("express");
const {
  addBrands,
  getBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");
const {
  getBrandByIDValidator, updateBrandValidator, deleteBrandValidator, createBrandValidator,
} = require("../utils/validator/brandValidator");

const router = express.Router();


router.route("/").get(getBrand).post(createBrandValidator,addBrands);
router
  .route("/:id")
  .get(getBrandByIDValidator, getBrandById)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;