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
        maxlength:[100,'Too long product price']
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

module.exports = mongoose.model('Product',productSchema);