const subCategoryRoute = require('./subCategoryRoute');
const brandRoute = require("./brandRoute");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const productRoute = require("./productRoute");
const reviewRoute = require('./reviewRoute');
const addressRoute = require('./addressRoute');
const wishlistRoute = require('./wishlistRoute');
const categoryRoute = require("./categoryRoute");
const couponRoute = require('./couponRoute');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');

const mountRoutes= (app)=>{
    //Routes
app.use('/api/user',userRoute);
app.use('/api/category',categoryRoute);
app.use('/subCategory',subCategoryRoute);
app.use('/api/brands',brandRoute);
app.use('/api/product',productRoute);
app.use('/api/auth',authRoute);
app.use('/api/review',reviewRoute);
app.use('/api/addresses', addressRoute);
app.use('/api/wishlist', wishlistRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
};

module.exports = mountRoutes;


