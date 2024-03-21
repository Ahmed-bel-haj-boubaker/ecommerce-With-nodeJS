const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.addAddress = asyncHandler(async (req, res, next) => {
  // $addToSet => add address object to user addresses  array if address not exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Address added successfuly",
    data: user.addresses,
  });
});

exports.removeAddress = asyncHandler(async (req, res, next) => {
      // $pull => remove address object from user addresses array if addressId exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );
  console.log(user.addresses)
  res.status(200).json({status:'success',message:'Address removed successfuly',data:user.addresses});
});


exports.getLoggedUserAddress = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id).populate('addresses');
    res.status(200).json({
        status:'success',
        results:user.addresses.length,
        data:user.addresses
    })
})
