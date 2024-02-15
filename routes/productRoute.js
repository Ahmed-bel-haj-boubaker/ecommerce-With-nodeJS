const express = require("express");
const {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
const {
  getProductValidator, updateProductValidator, deleteProductValidator, createProductValidator,
} = require("../utils/validator/productValidator");

const router = express.Router();


router.route("/").get(getProduct).post(createProductValidator,addProduct);
router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;