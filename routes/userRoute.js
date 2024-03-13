const express = require("express");
const {
  addUsers,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
} = require("../services/userService");
const {
  getUserByIDValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validator/userValidator");

const router = express.Router();

router
  .route("/")
  .get(getUser)
  .post(uploadUserImage, resizeImage, createUserValidator, addUsers);
router
  .route("/:id")
  .get(getUserByIDValidator, getUserById)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);
module.exports = router;
