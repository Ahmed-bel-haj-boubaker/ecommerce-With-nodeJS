const { check } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
// eslint-disable-next-line import/order
const slugify = require('slugify');

exports.getBrandByIDValidator = [
    check("id").isMongoId().withMessage("Invalid Brand id format"),
    validatorMiddleware
];

exports.createBrandValidator = [
    check('name')
    .notEmpty()
    .withMessage('Brand required')
    .isLength({ min: 3 })
    .withMessage('Too short Brand name')
    .isLength({ max: 32 })
    .withMessage('Too long Brand name')
    .custom((val, { req }) => {
        console.log(typeof val) // undefined
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updateBrandValidator = [
    check("id").isMongoId().withMessage("Invalid Brand id format"),
    validatorMiddleware
];

exports.deleteBrandValidator = [
    check("id").isMongoId().withMessage("Invalid Brand id format"),
    validatorMiddleware
];



 