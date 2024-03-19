
// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require("uuid");
const handlerFactory = require('./handlersFactory');
const CategoryModel = require("../models/categoryModel");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
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

exports.addCategories = handlerFactory.addDocument(CategoryModel);

// // // asyncHandler(async (req, res) => {
// // //   //asyncHandler:  middleware is often created to handle asynchronous operations within a route handler
// // //   // ensuring that any errors that occur during the asynchronous operation are properly caught and forwarded to the error-handling middleware.
// // //   const {name} = req.body;
// // //   const category = await CategoryModel.create({ name, slug: slugify(name) }); // Generate a 'slug' based on the 'name' using slugify
// // //   res.status(201).json({ data: category });
// // // });
// console.log(name);
// const newCategory = new CategoryModel({name});
// newCategory.save().then(
//     (doc)=>{
//         res.json(doc);
//     }
// ).catch(
//     (err)=>{res.send(err)}
// )

exports.getCategory = handlerFactory.getDocument(CategoryModel);

exports.getCategoryById = handlerFactory.getById(CategoryModel);

exports.updateCategory = handlerFactory.updateOne(CategoryModel);

exports.deleteCategory = handlerFactory.deleteOne(CategoryModel);


exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
     console.log(req.file)
    if(req.file){
    
      await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`./uploads/categories/${filename}`);
    req.body.profileImg = filename;
    }
  
    next();
  });
