const express = require("express");
const { addCategories } = require("../services/categoryService");

const router = express.Router();



router.post('/add',addCategories);

module.exports = router;

