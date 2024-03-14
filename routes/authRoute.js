const express = require("express");
const {
  signup,
  login,
  forgetPassword
} = require("../services/authService");
const {
  signupValidator,
  loginValidator
} = require("../utils/validator/authValidator");

const router = express.Router();

router.post('/signup',signupValidator,signup)
router.post('/login',loginValidator,login)
router.post('/forgotPassword',forgetPassword)
module.exports = router;
