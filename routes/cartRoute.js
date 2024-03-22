const express = require("express");
const authService = require("../services/authService");
const CartService = require("../services/cartService");

const router = express.Router();
router.use(authService.protect, authService.allowedTo("user"));
router.route("/").post(CartService.addProductToCart).get(CartService.getLoggedUserCart);

module.exports = router;
