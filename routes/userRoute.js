const express = require("express");
const {
  addUsers,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
} = require("../services/userService");
const {
  getUserByIDValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
} = require("../utils/validator/userValidator");

const router = express.Router();

router
  .route("/")
  .get(getUser)
  .post( uploadUserImage, resizeImage, createUserValidator,addUsers);
router
  .route("/:id")
  .get(getUserByIDValidator, getUserById)
  .put( uploadUserImage, resizeImage,updateUserValidator, updateUser)
  .delete( deleteUserValidator,deleteUser);

module.exports = router;
