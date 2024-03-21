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

  router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .put(
    authService.protect,
    authService.allowedTo('user'),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authService.protect,
    authService.allowedTo('user', 'manager', 'admin'),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
