const express = require("express");
const {
  addCategories,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadBrandImage,
  resizeImage,
} = require("../services/categoryService");
const {
  getCategoryByIDValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require("../utils/validator/categoryValidator");
const AuthService = require("../services/authService");
const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subCategory", subCategoryRoute); // if the req is like that /:categoryId/subCategory ==> get me to subCategoryRoute

router
  .route("/")
  .get(getCategory)
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    createCategoryValidator,
    addCategories
  );
router
  .route("/:id")
  .get(getCategoryByIDValidator, getCategoryById)
  .put(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin" ),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
