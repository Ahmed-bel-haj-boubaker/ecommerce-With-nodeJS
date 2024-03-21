const express = require("express");
const authService = require("../services/authService");

const addressService = require("../services/addressService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));
router
  .route("/")
  .post(addressService.addAddress)
  .get(addressService.getLoggedUserAddress);
router.route("/:addressId").delete(addressService.removeAddress);

module.exports = router;
