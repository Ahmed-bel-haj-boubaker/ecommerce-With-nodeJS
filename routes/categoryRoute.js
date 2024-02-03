const express = require("express");
const { addCategories,getCategory, getCategoryById,updateCategory,deleteCategory } = require("../services/categoryService");

const router = express.Router();



router.get('/',getCategory).post('/',addCategories);
router.get('/:id',getCategoryById).put('/:id',updateCategory).delete('/:id',deleteCategory);

module.exports = router;

