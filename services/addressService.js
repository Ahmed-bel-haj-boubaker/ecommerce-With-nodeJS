const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.addAddress = asyncHandler(async (req, res, next) => {
  // $addToSet => add address object to user addresses  array if address not exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { adresses: req.body } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Address added successfuly",
    data: user.adresses,
  });
});

exports.removeAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );

  res.status(200).json({status:'success',message:'Address removed successfuly',data:user.adresses});
});
