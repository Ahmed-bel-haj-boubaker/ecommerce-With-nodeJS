/* eslint-disable import/no-extraneous-dependencies */
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const handlerFactory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

exports.addUsers = handlerFactory.addDocument(userModel);

exports.getUser = handlerFactory.getDocument(userModel);

exports.getUserById = handlerFactory.getById(userModel);

exports.updateUser = asyncHandler(async (req, res, next) => {
  const updatedDocument = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },

    { new: true }
  );
  if (!updatedDocument) {
    return next(new ApiError(`No document for this id: ${req.params.id}`, 404));
  }

  updatedDocument.save();
  res.status(200).json({ updatedDocument: updatedDocument });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const updatedDocument = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },

    { new: true }
  );
  if (!updatedDocument) {
    return next(new ApiError(`No document for this id: ${req.params.id}`, 404));
  }

  updatedDocument.save();
  res.status(200).json({ updatedDocument: updatedDocument });
});

exports.deleteUser = handlerFactory.deleteOne(userModel);

exports.uploadUserImage = uploadSingleImage("profileImg");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  console.log(filename);
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`./uploads/users/${filename}`);
    req.body.profileImg = filename;
  }

  next();
});
