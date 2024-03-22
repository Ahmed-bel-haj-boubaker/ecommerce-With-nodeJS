const express = require("express");
const authService = require("../services/authService");

const router = express.Router();
const addressService = require("../services/addressService");



router.use(authService.protect, authService.allowedTo("user"));
router
  .route("/")
  .post(addressService.addAddress)
  .get(addressService.getLoggedUserAddress);
router.route("/:addressId").delete(addressService.removeAddress);

module.exports = router;
