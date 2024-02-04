const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({

    name : {
        type:String,
        trim: true, //trim : when the name is like that with space ("ahmed    ") it will be stored in the database without space like that ("ahmed")
        unique:[true,"SubCategory must be unique"],
        minlength:[3,'Too short subCategory name'],
        maxlength:[32,'Too long subCategory name']
    },
    slug:{
        type : String,
        lowercase : true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        require : [true,"subCategory must be belong to parent category"]
    }


},{timestamps:true});

const SubCategoryModel = mongoose.model('SubCategory',subCategorySchema);
module.exports = SubCategoryModel;