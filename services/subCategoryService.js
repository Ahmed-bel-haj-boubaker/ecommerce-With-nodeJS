const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require('../models/subCategoryModel');
const ApiError = require("../utils/apiError");


exports.addSubCategories = asyncHandler(async (req, res) => {
   
    const {name,category} = req.body;
    const subCategory = await SubCategoryModel.create({ name, slug: slugify(name) ,category}); 
    res.status(201).json({ data: subCategory });
  });


exports.getSubCategories = asyncHandler(async (req, res) => {

  const SubCategory = await SubCategoryModel.find({});
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
  

