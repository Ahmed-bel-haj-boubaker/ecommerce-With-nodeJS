const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

const generateToken = (payload) =>
  jwt.sign(
    {
      userId: payload, // data payload
    },
    process.env.JWT_SECRET_KEY, // secret key
    {
      expiresIn: process.env.JWT_EXPIRE_TIME, //expire time
    }
  );

exports.signup = asyncHandler(async (req, res, next) => {
  // 1 create User
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2 generate token

  const token = generateToken(user._id);

  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  // 1 - check if user password and email in the body (validation layer)
  // 2 - check if user exist & if password correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  // 3 - generate token

  const token = generateToken(user._id);
  // 4 - send Response to client side

  res.status(200).json({ data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  // 1 - check if token exist , if exist so get it
  //console.log(req.headers);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // to access the token Bearer[0]eyJhbGciOiJIUzI1Ni[1]
    console.log(token);
  }
  if(!token){
    return next(new ApiError('You are not login , please login to access this route',401));
  }
  // 2 - verify token(no change happens , expired token)
 const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
 console.log(decoded)
//  {
//     userId: '65f1062da5506a5991d4f021',
//     iat: 1710295982,
//     exp: 1718071982
//   }


  // 3 - check if user exist from the token ( bcz the id of the user is in the token)
  // 4 - check if user change his password after token created
});
