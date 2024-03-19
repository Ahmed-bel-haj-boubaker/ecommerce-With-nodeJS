const handlerFactory = require('./handlersFactory');
const Review = require('../models/reviewModel');
// Nested route
// GET /api/v1/products/:productId/reviews
exports.createFilterObj = (req,res,next)=>{
    let filterObject = {};
    if(req.params.productId) filterObject= {product:req.params.productId};
    req.filterObj = filterObject;
    next();
};

exports.getReviews = handlerFactory.getDocument(Review);

exports.getReview = handlerFactory.getById(Review);

exports.createReview = handlerFactory.addDocument(Review);

exports.updateReview = handlerFactory.updateOne(Review);

exports.deleteReview = handlerFactory.deleteOne(Review);

// Nested route (Create)
exports.setProductIdAndUserIdToBody = (req,res,next)=>{
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user._id;
    next();
}