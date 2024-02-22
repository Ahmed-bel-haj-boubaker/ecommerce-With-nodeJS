const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const ApiError = require("../utils/apiError");



exports.addProduct = asyncHandler(async (req, res,next) => {

  req.body.slug = slugify(req.body.title)
  const Product = await ProductModel.create(req.body);
  res.status(201).json({ data: Product });
});



exports.getProduct = asyncHandler(async (req, res,next) => {
  // 1  Filtring http://localhost:8000/api/product?page=1&ratingsAverage[lte]=4&price[lt]=20
  const queryStringObj={...req.query};
  
  const excludesFields = ['page','sort','limit','fields'];

  excludesFields.forEach(field=>delete queryStringObj[field]);
  let queryString = JSON.stringify(queryStringObj);
      queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,(match)=> `$${match}`);
     


  // 2 pagination  
  const page = req.query.page * 1 || 1; 
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  


  // Build Query 
 let mongooseQuery = ProductModel.find(JSON.parse(queryString)).skip(skip).limit(limit);


   // 3 sorting  http://localhost:8000/api/product?sort=-sold,price
   if(req.query.sort){
    // price, -sold ==> [price, -sold] price -sold
    const sortBy= req.query.sort.split(',').join(' ');
    console.log(sortBy)
    mongooseQuery= mongooseQuery.sort(sortBy);
  }else{
    // eslint-disable-next-line no-const-assign
    mongooseQuery= mongooseQuery.sort('-createdAt');

  }


  // 4 Filed Limiting http://localhost:8000/api/product?fields=title,price,sold
  if(req.query.fields){
    const fildes = req.query.fields.split(',').join(' ');
    mongooseQuery = mongooseQuery.select(fildes);
  }else {
    mongooseQuery = mongooseQuery.select('-__v');

  }
  // 5 Search 

  if(req.query.keyword){
    const query = { };
    query.$or = [ //$options:'i' ==> men like MENs for search
      { title :{ $regex: req.query.keyword ,$options:'i'}},
      { description :{ $regex: req.query.keyword ,$options:'i'}}
    ];
    console.log(query)
    mongooseQuery = mongooseQuery.find(query);
    
  }


  // execute Query 
  const Product = await mongooseQuery;
  res.status(200).json({ results: Product.length, page, data: Product });
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await ProductModel.findById(id);
  if (!Product) {
    return next(new ApiError(`No Product for this id: ${id}`, 404));
  }
  res.status(200).json({ data: Product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title)

  const categorie = await ProductModel.findById(id);
  if (!categorie) {
     next(new ApiError(`No Product for this id: ${id}`, 404));
  }
  const ProductUpdated = await ProductModel.findOneAndUpdate(
    { _id: id },
     req.body,
    { new: true }
  );
  res.status(201).json({ ProductUpdated: ProductUpdated });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await ProductModel.findOneAndDelete({ _id: id });
  if (!Product) {
    return next(new ApiError(`No Product for this id: ${id}`, 404));
  }

  res.status(204).json({ msg: "Product is deleted" });
});
