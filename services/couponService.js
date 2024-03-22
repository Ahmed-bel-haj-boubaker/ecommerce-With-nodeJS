const factory = require('./handlersFactory');
const Coupon = require('../models/couponModel');


exports.getCoupons = factory.getDocument(Coupon);

exports.getCoupon = factory.getById(Coupon);

exports.createCoupon = factory.addDocument(Coupon);

exports.updateCoupon = factory.updateOne(Coupon);

exports.deleteCoupon = factory.deleteOne(Coupon);