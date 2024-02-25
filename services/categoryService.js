const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

// Promise : In asynchronous programming, promises represent the eventual result (completion or failure) of an asynchronous operation
//Key Characteristics of Promises:
// Three States: pending, fulfilled, and rejected.
// pending: The operation is ongoing, and the outcome is unknown.
// fulfilled: The operation completed successfully, and a value is available.
// rejected: The operation failed, and an error is available.
// Chaining: You can chain then and catch methods to perform actions based on the promise's state.
// Non-blocking: Async functions don't block the main thread while waiting for promises to resolve.
//the async keyword is used to define a function as asynchronous.
// an async function always return a promise ( if the function return a value the promise will be resolved with that value or if the function throw an exception the Promise will be rejected with the thrown value)
// await : is used inside a async function we use await for the completion of a promise . it pauses the excution of the async function until the promise will be resolved or rejected

//asyncHandler catch the error from the async await function and give it to the express error handler

exports.addCategories = asyncHandler(async (req, res) => {
  //asyncHandler:  middleware is often created to handle asynchronous operations within a route handler
  // ensuring that any errors that occur during the asynchronous operation are properly caught and forwarded to the error-handling middleware.
  const {name} = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) }); // Generate a 'slug' based on the 'name' using slugify
  res.status(201).json({ data: category });
});
// console.log(name);
// const newCategory = new CategoryModel({name});
// newCategory.save().then(
//     (doc)=>{
//         res.json(doc);
//     }
// ).catch(
//     (err)=>{res.send(err)}
// )

exports.getCategory = asyncHandler(async (req, res) => {
  const countDocument = await CategoryModel.countDocuments();
  // Initialize ApiFeature with ProductModel.find() and req.query
  const apiFeature = new ApiFeature(CategoryModel.find(), req.query)
    .pagination(countDocument)
    .filter()
    .search()
    .limitFields()
    .sort();
    const {mongooseQuery,paginationResult} = apiFeature;
    const categories = await mongooseQuery;
  res.status(200).json({ results: categories.length, paginationResult, data: categories });
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    // return res.status(404).json({ error: `No category found with id ${id}` });
    return next(new ApiError(`No Category for this id: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const categorie = await CategoryModel.findById(id);
  if (!categorie) {
     next(new ApiError(`No Category for this id: ${id}`, 404));
  }
  const categoryUpdated = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  res.status(201).json({ categoryUpdated: categoryUpdated });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findOneAndDelete({ _id: id });
  if (!category) {
    return next(new ApiError(`No Category for this id: ${id}`, 404));
  }

  res.status(204).json({ msg: "Category is deleted" });
});
