const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

exports.addProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const Product = await ProductModel.create(req.body);
  res.status(201).json({ data: Product });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  // Initialize ApiFeature with ProductModel.find() and req.query
  const apiFeature = new ApiFeature(ProductModel.find(), req.query)
    .pagination()
    .filter()
    .search()
    .limitFields()
    .sort();

  // Execute Query
  try {
    const products = await apiFeature.mongooseQuery;
    res.status(200).json({ results: products.length, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
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
  req.body.slug = slugify(req.body.title);

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
