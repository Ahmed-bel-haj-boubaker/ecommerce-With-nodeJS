const express = require("express");
const {
  signup,
  login,
  forgetPassword,
  verifyResetCode
} = require("../services/authService");
const {
  signupValidator,
  loginValidator
} = require("../utils/validator/authValidator");

const router = express.Router();

router.post('/signup',signupValidator,signup)
router.post('/login',loginValidator,login)
router.post('/forgotPassword',forgetPassword)
router.post('/verifyResetCode',verifyResetCode)
module.exports = router;
