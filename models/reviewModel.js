const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema(
  {
    tile: {
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, "Min ratings value is 1.0"],
      max: [5, "Max ratings value is 5.0"],
      required: [true, "review ratings required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref:'Product',
      required:[true, 'Review must belong to product'],
    },

  },
  {
    timestamps: true,
  }
);

reviewSchema.statics.calcAvgRatingsAndQuantity = async function(productId){
  const result = await this.aggregate([
        // Stage 1 : get all reviews in specific product
      {
        $match:{product:productId}
      },
          // Stage 2: Grouping reviews based on productID and calc avgRatings, ratingsQuantity
      {
        $group:{
          _id:'product',
          avgRatings:{$avg:'$ratings'},
          ratingsQuantity:{$sum:1}

        }
      }
  ]);
  if(result.length>0){
    console.log(result,"result")
    await Product.findByIdAndUpdate(productId,{
      ratingsAverage:result[0].avgRatings,
      ratingsQuantity:result[0].ratingsQuantity
    })
  }else{
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save',async function(){
  console.log(this.product)
  await this.constructor.calcAvgRatingsAndQuantity(this.product);
});

reviewSchema.post('remove',async function(){
  console.log(this.product)
  await this.constructor.calcAvgRatingsAndQuantity(this.product);
 
});
module.exports = mongoose.model('Review',reviewSchema);