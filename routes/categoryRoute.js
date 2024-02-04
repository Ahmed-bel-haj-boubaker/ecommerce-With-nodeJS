const express = require("express");
const {
  addCategories,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const {
  getCategoryByIDValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator,
} = require("../utils/validator/categoryValidator");

const router = express.Router();

router.route("/").get(getCategory).post(createCategoryValidator,addCategories);
router
  .route("/:id")
  .get(getCategoryByIDValidator, getCategoryById)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;