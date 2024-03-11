/* eslint-disable import/no-extraneous-dependencies */
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/userModel");
const handlerFactory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.addUsers = handlerFactory.addDocument(userModel);

exports.getUser = handlerFactory.getDocument(userModel);

exports.getUserById = handlerFactory.getById(userModel);

exports.updateUser = handlerFactory.updateOne(userModel);

exports.deleteUser = handlerFactory.deleteOne(userModel);

exports.uploadUserImage = uploadSingleImage("profileImg");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
console.log(filename)
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`./uploads/users/${filename}`);
  req.body.image = filename;

  next();
});
