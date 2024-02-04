const { check } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getCategoryByIDValidator = [
    check("id").isMongoId().withMessage("Invalid category id"),
    validatorMiddleware
]

 