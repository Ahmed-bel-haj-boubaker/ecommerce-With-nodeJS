const express = require("express");
const {
  getReviews,
  getReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
  deleteReview,
  updateReview,
  createReview,
} = require("../services/reviewService");
const authService = require("../services/authService");
const {
  deleteReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  createReviewValidator,
} = require("../utils/validator/reviewValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getReviews)
  .post(
    authService.protect,
    authService.allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );

module.exports = router;
