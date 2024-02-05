const mongoose = require("mongoose");


// 1- Create Schema
const brandSchema = new mongoose.Schema({
    name:{
        type : String,
        required: [true,'brand required'],
        unique: [true,'brand must be unique'],
        minlength:[3,'Too short brand name'],
        maxlength:[32,'Too long brand name']
    },
    slug:{
        type : String,
        lowercase : true
    },
    image:String

},{
    timestamps : true // create updatedAt and createAt
});
//2- Create Model

const  brandModel = mongoose.model('Brand',brandSchema);

module.exports = brandModel;