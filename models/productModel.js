const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title:{
        type : String,
        trim:true,
        required: [true,'product required'],
        minlength:[3,'Too short product name'],
        maxlength:[100,'Too long product name']
    },
    slug:{
        type : String,
        lowercase : true,
        required:true
    },
    description:{
        type : String,
        required: [true,'product description is required'],
        minlength:[100,'Too short product description '],
    },
    quantity:{
        type:Number,
        required:[true,'product quantity is required']
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'product price is required'],
        trim:true,
    },
    priceAfterDiscount:{
        type: Number
    },
    color: [String],
    imageCover:{
        type: String,
        required:[true,'product image cover is required']

    },
    images:[String],
    category:{
        type: mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'product must be belong to category '],
    },
    subCategory:[{
        type:mongoose.Schema.ObjectId,
        ref:'SubCategory'
    }],
    brand:{
        type: mongoose.Schema.ObjectId,
        ref:'Brand'
    },
    ratingsAverage:{
        type:Number,
        min:[1,'Rating must be above or equal 1.0'],
        max:[5,'Rating must be below or  equal 5.0']
    },
    ratingsQuantity:{
        type:Number,
        default:0
    }


},{timestamps:true});

productSchema.virtual('reviews',{ // create a virtual field 'reviews' in the productSchema 
     //A virtual field is not stored in the database,but it can be calculated from existing data
    ref:"Review",
    foreignField:'product',
    localField:'_id'
})



// Mongoose query middleware (pre)
productSchema.pre(/^find/,function(next){ 
    this.populate({
        path:'category',
        select:'name -_id'
    });
    next();
});
const setImageURL = (doc) => {
    if (doc.imageCover) {
      const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
      doc.imageCover = imageUrl;
    }
    if (doc.images) {
      const imagesList = [];
      doc.images.forEach((image) => {
        const imageUrl = `${process.env.BASE_URL}/products/${image}`;
        imagesList.push(imageUrl);
      });
      doc.images = imagesList;
    }
  };
  // findOne, findAll and update
  productSchema.post('init', (doc) => {
    setImageURL(doc);
  });
  
  // create
  productSchema.post('save', (doc) => {
    setImageURL(doc);
  });
module.exports = mongoose.model('Product',productSchema);