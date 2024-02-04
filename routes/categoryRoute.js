const express = require("express");
const {
  addCategories,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const {
  getCategoryByIDValidator,
} = require("../utils/validator/categoryValidator");

const router = express.Router();

router.route("/").get(getCategory).post(addCategories);
router
  .route("/:id")
  .get(getCategoryByIDValidator, getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;