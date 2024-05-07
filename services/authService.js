const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

exports.signup = asyncHandler(async (req, res, next) => {
  // 1 create User
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user)
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
  if (!token) {
    return next(
      new ApiError("You are not login , please login to access this route", 401)
    );
  }
  // 2 - verify token(no change happens , expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  //  {
  //     userId: '65f1062da5506a5991d4f021',
  //     iat: 1710295982,
  //     exp: 1718071982
  //   }

  // 3 - check if user exist from the token ( bcz the id of the user is in the token)
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "the user that belong to this token does no longer exist",
        401
      )
    );
  }
  // 4 - check if user change his password after token created

  if (currentUser.passwordChangedAt) {
    const passChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChangedTimeStamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password, Please login again..",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});

exports.allowedTo = (roles) =>
  asyncHandler(async (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  // 1 search for the user if he exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ApiError(`user not found with this email address : ${req.body.email}`)
    );
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(resetCode);
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  user.passwordresetCode = hashedResetCode;
  user.passwordresetCodeExpire = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  console.log(user);
  // 3) Send the reset code via email
  const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valid for 10 min)",
      message,
    });
  } catch (error) {
    user.passwordResetVerified = undefined;
    user.passwordresetCode = undefined;
    user.passwordresetCodeExpire = undefined;
    await user.save();
    return next(new ApiError("There is an error in sending email ", 500));
  }
  res
    .status(200)
    .json({ status: "Success", message: "Reset code sent to email " });
});

exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedRestCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordresetCode: hashedRestCode,
    passwordresetCodeExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Reset code invalid or expired"));
  }
  user.passwordResetVerified = true;
  await user.save();
  res.status(200).json({ status: "Success" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user =await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("there is no user with this email address", 404));
  }

  if (user.passwordResetVerified === false) {
    return next(new ApiError("Reset code not verified", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetVerified = false;
  user.passwordresetCode = undefined;
  user.passwordresetCodeExpire = undefined;

  await user.save()

  const token = generateToken(user._id);
  res.status(200).json({ data: user, token });
});
