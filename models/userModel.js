const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    name : {
        type: String,
        trim : true,
        required:[true,'name required']
    },
    slug:{
        type: String,
        lowercase : true,
    },
    email : {
        type:String,
        required:[true,'email required'],
        unique : true,
        lowercase : true
    },
    phone : Number,
    profileImg : String,

    password : {
        type: String,
        required : [true,'password required'],
        minLength:[6,'Too short password']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }


},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next(); 
    // Hashing user password
    this.password =await  bcrypt.hash(this.password,12) ;
    next(); 
})


const User = mongoose.model('User',userSchema);
module.exports = User;