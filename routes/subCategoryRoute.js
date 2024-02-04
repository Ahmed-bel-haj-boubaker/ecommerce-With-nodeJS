const express = require("express");
const {addSubCategories, getSubCategories, updateSubCategory, deleteSubCategory, getSubCategoryById} = require("../services/subCategoryService");
const { createsubCategoryValidator, getsubCategoryByIDValidator, updatesubCategoryValidator, deletesubCategoryValidator } = require("../utils/validator/subCategoryValidator");

const router = express.Router();

router.route('/addSubCategory')
      .post(createsubCategoryValidator,addSubCategories);

router.route('/getAllSubCategory').get(getSubCategories);
router.route('/getSubCategoryById/:id').get(getsubCategoryByIDValidator,getSubCategoryById);
router.route('/updateSubCategory/:id').put(updatesubCategoryValidator,updateSubCategory);
router.route("/deleteSubCategory/:id").delete(deletesubCategoryValidator,deleteSubCategory);




module.exports = router;