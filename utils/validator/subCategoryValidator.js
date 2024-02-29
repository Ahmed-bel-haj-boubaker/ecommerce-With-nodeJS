const { check } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getsubCategoryByIDValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
];

exports.createsubCategoryValidator = [
    check("name")
    .notEmpty()
    .withMessage('SubCategory required')
    .isLength({min:3})
    .withMessage('Too short SubCategory name')
    .isLength({max : 32})
    .withMessage('Too long SubCategory name'),
    check('category').notEmpty().withMessage('subCategory must be belong to category')
    .isMongoId().withMessage('Invalid Category id format'),
validatorMiddleware
];

exports.updatesubCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
];

exports.deletesubCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
];



 