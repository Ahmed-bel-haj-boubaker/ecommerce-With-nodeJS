const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const ApiError = require("../utils/apiError");



exports.addProduct = asyncHandler(async (req, res,next) => {

  req.body.slug = slugify(req.body.title)
  const Product = await ProductModel.create(req.body);
  res.status(201).json({ data: Product });
});


exports.getProduct = asyncHandler(async (req, res,next) => {
  // 1  Filtring
  const queryStringObj={...req.query};
  
  const excludesFields = ['page','sort','limit','fields'];

  excludesFields.forEach(field=>delete queryStringObj[field]);

  console.log(req.query)
  console.log(queryStringObj)
  // 2 pagination  
  const page = req.query.page * 1 || 1; 
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  // Build Query 
 const mongooseQuery = ProductModel.find(queryStringObj).skip(skip).limit(limit);

  // execute Query 
  const Product = await mongooseQuery;
  res.status(200).json({ results: Product.length, page, data: Product });
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await ProductModel.findById(id);
  if (!Product) {
    return next(new ApiError(`No Product for this id: ${id}`, 404));
  }
  res.status(200).json({ data: Product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title)

  const categorie = await ProductModel.findById(id);
  if (!categorie) {
     next(new ApiError(`No Product for this id: ${id}`, 404));
  }
  const ProductUpdated = await ProductModel.findOneAndUpdate(
    { _id: id },
     req.body,
    { new: true }
  );
  res.status(201).json({ ProductUpdated: ProductUpdated });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await ProductModel.findOneAndDelete({ _id: id });
  if (!Product) {
    return next(new ApiError(`No Product for this id: ${id}`, 404));
  }

  res.status(204).json({ msg: "Product is deleted" });
});
