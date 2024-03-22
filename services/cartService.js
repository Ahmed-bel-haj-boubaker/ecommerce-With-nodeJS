const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");

exports.calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body; // to desctruct the value of productId and color from the body

  const product = await Product.findById(productId); // find if the product that i have passed in the request body exist or not

  //1 - get Cart for logged user

  let cart = await Cart.findOne({ user: req.user._id }); // find if the logged user have a cart or not

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    }); // if the logged user does not have a cart so i will create his cart
  } else {
    // product exist in cart, update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    ); // test if there is a product in cartItems[] or not with the index
    //console.log(item.product) ==>new ObjectId('65e0ef4a68d7c4abfd8f2d35')
    //console.log(item.product.toString()) ==>65e0ef4a68d7c4abfd8f2d37
    //console.log(productIndex, " product Index");==> 4

    if (productIndex > -1) { // if there is a product in cartItems[]
      const cartItem = cart.cartItems[productIndex]; 
      //console.log(cartItem,'cartItem')
    // for example : cart.cartItems[1] ====> {
    //     product: new ObjectId('65e0ef4a68d7c4abfd8f2d35'),
    //     quantity: 12,
    //     price: 55.99,
    //     _id: new ObjectId('65fcdce13b9c4c2fd49cb0ae')
    //   }
      
      cartItem.quantity += 1;//increment the quantity +1 
 
      cart.cartItems[productIndex] = cartItem;
      console.log(cartItem);
    } else {
      // product not exist in cart,  push product to cartItems array
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }

  this.calcTotalCartPrice(cart);

  await cart.save();
  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
