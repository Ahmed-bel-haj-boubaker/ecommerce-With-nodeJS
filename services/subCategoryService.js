const SubCategoryModel = require("../models/subCategoryModel");
const handlerFactory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  // nested Route
  if (!req.body.category) req.body.category = req.params.categoryId; // if there is no category in the body then get the category from the params
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  console.log(filterObject);
  console.log(req.params.categoryId);

  req.filterObject = filterObject;
  next();
};

exports.addSubCategories = handlerFactory.addDocument(SubCategoryModel);

exports.getSubCategories = handlerFactory.getDocument(SubCategoryModel);

exports.getSubCategoryById = handlerFactory.getById(SubCategoryModel);

exports.updateSubCategory = handlerFactory.updateOne(SubCategoryModel);

exports.deleteSubCategory = handlerFactory.deleteOne(SubCategoryModel);
