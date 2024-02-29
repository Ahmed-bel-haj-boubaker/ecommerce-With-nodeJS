const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

exports.deleteOne = (model) => 
  asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
         await model.findOneAndDelete({ _id: id });
        return res.status(204).json({ msg: "document is deleted" });
    } catch (error) {
        const { id } = req.params;

        next(new ApiError(`No document for this id: ${id}`, 404));
        return res.status(204).json({ msg: "document is deleted" });
    }
   
  });


exports.getDocument = (model) =>
  asyncHandler(async (req, res) => {
    try {
      // const page = req.query.page * 1 || 1; // extract the string value of the page number in the url and convert it to a number or we initialize the page number to 1
      // const limit = req.query.limit * 1 || 5;
      // const skip = (page - 1) * limit;
      const countDocument = await model.countDocuments();
      // Initialize ApiFeature with ProductModel.find() and req.query
      const apiFeature = new ApiFeature(model.find(), req.query)
        .pagination(countDocument)
        .filter()
        .search('Products')
        .limitFields()
        .sort();
      const { mongooseQuery, paginationResult } = apiFeature;
      const documents = await mongooseQuery;

      if (documents) {
        return res.status(200).json({
          results: documents.length,
          paginationResult,
          data: documents,
        });
      }
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ error: error.message });
    }
  });

exports.addDocument = (model) =>
  asyncHandler(async (req, res) => {
    //asyncHandler:  middleware is often created to handle asynchronous operations within a route handler
    // ensuring that any errors that occur during the asynchronous operation are properly caught and forwarded to the error-handling middleware.
    try {
      const { name } = req.body;
      const document = await model.create({ name, slug: slugify(name) }); // Generate a 'slug' based on the 'name' using slugify
      res.status(201).json({ data: document });
    } catch (error) {
      res.status(201).json({ error: error });
    }
  });

exports.getById = (model) =>
  asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const document = await model.findById(id);
      res.status(200).json({ data: document });
    } catch (error) {
      const { id } = req.params;
      res.status(200).json({ error: error });
      return next(new ApiError(`No document for this id: ${id}`, 404));
    }
  });

exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedDocument = await model.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
      );
      return res.status(201).json({ updatedDocument: updatedDocument });
    } catch (error) {
      const { id } = req.params;
      next(new ApiError(`No document for this id: ${id}`, 404));
      return res.status(404).json({ error: error });
    }
  });
