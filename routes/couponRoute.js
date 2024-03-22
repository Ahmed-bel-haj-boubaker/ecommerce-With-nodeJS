const express = require("express");
const authService = require("../services/authService");
const couponService = require("../services/couponService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user", "manager"));

router
  .route("/")
  .get(couponService.getCoupons)
  .post(couponService.createCoupon);
router
  .route("/:id")
  .get(couponService.getCoupon)
  .put(couponService.updateCoupon)
  .delete(couponService.deleteCoupon);

module.exports = router;
