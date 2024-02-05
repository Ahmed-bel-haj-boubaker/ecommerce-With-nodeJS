const express = require("express");
const {addSubCategories, getSubCategories, updateSubCategory, deleteSubCategory, getSubCategoryById,setCategoryIdToBody} = require("../services/subCategoryService");
const { createsubCategoryValidator, getsubCategoryByIDValidator, updatesubCategoryValidator, deletesubCategoryValidator } = require("../utils/validator/subCategoryValidator");


// mergeParams : allow us to access parameters on other routers
// ex : We need to access categoryId from category route 
const router = express.Router({mergeParams:true});

router.route('/').get(getSubCategories);


router.route('/addSubCategory')
      .post(setCategoryIdToBody,createsubCategoryValidator,addSubCategories);

router.route('/getSubCategoryById/:id').get(getsubCategoryByIDValidator,getSubCategoryById);
router.route('/updateSubCategory/:id').put(updatesubCategoryValidator,updateSubCategory);
router.route("/deleteSubCategory/:id").delete(deletesubCategoryValidator,deleteSubCategory);




module.exports = router;