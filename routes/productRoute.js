const express = require("express");
const {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
const {
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
  createProductValidator,
} = require("../utils/validator/productValidator");
const AuthService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(getProduct)
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    createProductValidator,
    addProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updateProductValidator,
    updateProduct
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
