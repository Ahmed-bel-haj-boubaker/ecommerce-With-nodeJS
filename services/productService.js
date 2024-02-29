const ProductModel = require("../models/productModel");
const handlerFactory = require('./handlersFactory');

exports.addProduct = handlerFactory.addDocument(ProductModel);

exports.getProduct = handlerFactory.getDocument(ProductModel);

exports.getProductById = handlerFactory.getById(ProductModel);

exports.updateProduct = handlerFactory.updateOne(ProductModel);

exports.deleteProduct = handlerFactory.deleteOne(ProductModel);
