const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

exports.signup = asyncHandler(async (req, res, next) => {
  // 1 create User
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2 generate token

  const token = jwt.sign(
    {
      userId: user._id, // data payload
    },
    process.env.JWT_SECRET_KEY, // secret key
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,//expire time
    }
  );

  res.status(201).json({data:user,token});
});
