const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require('../models/subCategoryModel');
const ApiError = require("../utils/apiError");


exports.addSubCategories = asyncHandler(async (req, res) => {
   
    const {name,category} = req.body;
    const subCategory = await SubCategoryModel.create({ name, slug: slugify(name) ,category}); 
    res.status(201).json({ data: subCategory });
  });

// Nested route
// GET /api/v1/categories/:categoryId/subcategories

exports.getSubCategories = asyncHandler(async (req, res) => {
     let filterObject = {};
     if (req.params.categoryId) filterObject = { category:req.params.categoryId}
     
    console.log(filterObject);
    console.log(req.params.categoryId)

  const SubCategory = await SubCategoryModel.find(filterObject);//.populate({path:'category',select:'name -_id'}); to return the subcategory with there only the name of  category and its not important to use this function beacause like in this example i has two queries and it slow the time of response of the server when i have many users ( many requests)

  res.status(200).json({ results: SubCategory.length, data: SubCategory });
});


exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const SubCategory = await SubCategoryModel.findById(id);
    if (!SubCategory) {
      // return res.status(404).json({ error: `No SubCategory found with id ${id}` });
      return next(new ApiError(`No SubCategory for this id: ${id}`, 404));
    }
    res.status(200).json({ data: SubCategory });
  });


  exports.updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const SubCategory = await SubCategoryModel.findById(id);
    if (!SubCategory) {
       next(new ApiError(`No SubCategory for this id: ${id}`, 404));
    }
    const SubcategoryUpdated = await SubCategoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(201).json({ categoryUpdated: SubcategoryUpdated });
  });


  exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const SubCategory = await SubCategoryModel.findOneAndDelete({ _id: id });
    if (!SubCategory) {
      return next(new ApiError(`No SubCategory for this id: ${id}`, 404));
    }
  
    res.status(204).json({ msg: "SubCategory is deleted" });
  });
  

