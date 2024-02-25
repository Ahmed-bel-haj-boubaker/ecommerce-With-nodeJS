const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require('../models/subCategoryModel');
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

exports.setCategoryIdToBody = (req,res,next)=>{
// nested Route
if(!req.body.category) req.body.category = req.params.categoryId; // if there is no category in the body then get the category from the params
next();
};
exports.addSubCategories = asyncHandler(async (req, res) => {
   
    const {name,category} = req.body;
    const subCategory = await SubCategoryModel.create({ name, slug: slugify(name) ,category}); 
    res.status(201).json({ data: subCategory });
  });

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req,res,next)=>{
  let filterObject = {};
     if (req.params.categoryId) filterObject = { category:req.params.categoryId}
     
    console.log(filterObject);
    console.log(req.params.categoryId)

    req.filterObject = filterObject;
    next();
}



exports.getSubCategories = asyncHandler(async (req, res) => {
   

  const countDocument = await SubCategoryModel.countDocuments();
  // Initialize ApiFeature with ProductModel.find() and req.query
  const apiFeature = new ApiFeature(SubCategoryModel.find(), req.query)
    .pagination(countDocument)
    .filter()
    .search()
    .limitFields()
    .sort();
    const {mongooseQuery,paginationResult} = apiFeature;
    const SubCategorys = await mongooseQuery;



  // const SubCategory = await SubCategoryModel.find(filterObject);//.populate({path:'category',select:'name -_id'}); to return the subcategory with there only the name of  category and its not important to use this function beacause like in this example i has two queries and it grow  the time of response of the server when i have many users ( many requests)

  res.status(200).json({ results: SubCategorys.length,paginationResult, data: SubCategorys });
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
  

