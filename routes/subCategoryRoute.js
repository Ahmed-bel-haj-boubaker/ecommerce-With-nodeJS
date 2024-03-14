const express = require("express");
const {
  addSubCategories,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  setCategoryIdToBody,
  createFilterObj,
} = require("../services/subCategoryService");
const {
  createsubCategoryValidator,
  getsubCategoryByIDValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
} = require("../utils/validator/subCategoryValidator");
const AuthService = require("../services/authService");

// mergeParams : allow us to access parameters on other routers
// ex : We need to access categoryId from category route
const router = express.Router({ mergeParams: true });

router.route("/").get(createFilterObj, getSubCategories);

router
  .route("/addSubCategory")
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    setCategoryIdToBody,
    createsubCategoryValidator,
    addSubCategories
  );

router
  .route("/getSubCategoryById/:id")
  .get(getsubCategoryByIDValidator, getSubCategoryById);
router
  .route("/updateSubCategory/:id")
  .put(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updatesubCategoryValidator,
    updateSubCategory
  );
router
  .route("/deleteSubCategory/:id")
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deletesubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
