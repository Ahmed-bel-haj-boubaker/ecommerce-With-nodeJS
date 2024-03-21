const express = require('express');
const wishlist = require('../services/wishlistService');
const authService = require('../services/authService');

const router = express.Router();


router.use(authService.protect,authService.allowedTo('user'));
router.route('/').post(wishlist.addToWishList).get(wishlist.getLoggedUserWishlist);

router.delete('/:productId',wishlist.removeProductFromWishlist);


module.exports = router;