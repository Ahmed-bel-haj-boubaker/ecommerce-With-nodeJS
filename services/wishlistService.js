const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.addToWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.productID },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status:'success',
    message:'Wishlist added successfuly',
    data:user.wishList,
  })
});

exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
    // $pull => remove productId from wishlist array if productId exist
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: req.params.productId },
      },
      { new: true }
    );
  
    res.status(200).json({
      status: 'success',
      message: 'Product removed successfully from your wishlist.',
      data: user.wishlist,
    });
  });
  
  // @desc    Get logged user wishlist
  // @route   GET /api/v1/wishlist
  // @access  Protected/User
  exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('wishlist');
  
    res.status(200).json({
      status: 'success',
      results: user.wishlist.length,
      data: user.wishlist,
    });
  });