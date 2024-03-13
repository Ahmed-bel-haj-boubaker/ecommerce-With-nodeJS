const { check, body } = require("express-validator");
const bcrypt = require("bcrypt");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
// eslint-disable-next-line import/order
const slugify = require("slugify");
const userModel = require("../../models/userModel");

exports.getUserByIDValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Too short user name")
    .isLength({ max: 20 })
    .withMessage("Too long user name")
    .custom((val, { req }) => {
      console.log(typeof val);
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required ")
    .isEmail()
    .withMessage("invalid Email address")
    .custom((val) =>
      userModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email is already exist"));
        }
      })
    ),
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required ")
    .isMobilePhone(["ar-TN"])
    .withMessage("invalid phone number only accepted Tunisia phone numbers"),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation required"),
  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  check("name")
    .optional()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Too short user name")
    .isLength({ max: 20 })
    .withMessage("Too long user name")
    .custom((val, { req }) => {
      console.log(typeof val);
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .optional()
    .notEmpty()
    .withMessage("Email is required ")
    .isEmail()
    .withMessage("invalid Email address")
    .custom((val) =>
      userModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email is already exist"));
        }
      })
    ),
  check("phone")
    .optional()
    .notEmpty()
    .withMessage("Phone number is required ")
    .isMobilePhone(["ar-TN"])
    .withMessage("invalid phone number only accepted Tunisia phone numbers"),

  check("profileImg").optional(),
  check("role").optional(),

  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("You must enter the password confirm"),
  body("password")
    .notEmpty()
    .withMessage("You must enter new password")
    .custom(async (val, { req }) => {
      // 1) verifie the cuurentPassword is valid or not
      const user = await userModel.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const VerifiePassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      console.log(VerifiePassword);
      if (VerifiePassword) {
        console.log(`this is the val: ${user.password} `);
        console.log(
          `this is the currentPassword: ${req.body.currentPassword} `
        );
      }

      if(req.body.passwordConfirm !== req.body.password){
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];
