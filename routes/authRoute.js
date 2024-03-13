const express = require("express");
const {
  signup
} = require("../services/authService");
const {
  signupValidator,
} = require("../utils/validator/authValidator");

const router = express.Router();

router.post('/signup',signupValidator,signup)
module.exports = router;
