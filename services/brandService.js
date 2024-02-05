const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../models/brandModel");
const ApiError = require("../utils/apiError");

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
  const Brand = await BrandModel.create({ name, slug: slugify(name) }); // Generate a 'slug' based on the 'name' using slugify
  res.status(201).json({ data: Brand });
});
// console.log(name);
// const newBrand = new BrandModel({name});
// newBrand.save().then(
//     (doc)=>{
//         res.json(doc);
//     }
// ).catch(
//     (err)=>{res.send(err)}
// )

exports.getBrand = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1; // extract the string value of the page number in the url and convert it to a number or we initialize the page number to 1
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

exports.getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Brand = await BrandModel.findById(id);
  if (!Brand) {
    // return res.status(404).json({ error: `No Brand found with id ${id}` });
    return next(new ApiError(`No Brand for this id: ${id}`, 404));
  }
  res.status(200).json({ data: Brand });
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brands = await BrandModel.findById(id);
  if (!brands) {
     next(new ApiError(`No Brand for this id: ${id}`, 404));
  }
  const BrandUpdated = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  res.status(201).json({ BrandUpdated: BrandUpdated });
});

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Brand = await BrandModel.findOneAndDelete({ _id: id });
  if (!Brand) {
    return next(new ApiError(`No Brand for this id: ${id}`, 404));
  }

  res.status(204).json({ msg: "Brand is deleted" });
});
