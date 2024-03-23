const express = require("express");
const authService = require("../services/authService");
const orderService = require("../services/orderService");

const router = express.Router();

router.use(authService.protect);

router
  .route("/:cartId")
  .post(authService.allowedTo("user"), orderService.createCashOrder);

router.route("/").get(authService.allowedTo("user"), orderService.getAllOrder);
router
  .route("/:id")
  .get(authService.allowedTo("user"), orderService.getOneOrder);

router
  .route("/:id/pay")
  .put(
    authService.allowedTo("manager", "admin"),
    orderService.updateOrderToPaid
  );

router
  .route("/:id/delivery")
  .put(
    authService.allowedTo("manager", "admin"),
    orderService.updateDeleveryStatus
  );

module.exports = router;
