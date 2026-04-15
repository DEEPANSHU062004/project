
const { required } = require('joi');
const mongoose =require('mongoose');
const user = require('./user');
const schema=mongoose.Schema
 const reviewschema = new schema({
   
    rating:{
        type:Number,
        min:1,
        max:5,
       required:true,
    },
    comment:String,
    createAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:schema.Types.ObjectId,
        ref:user
    },

});
 const Reviews = mongoose.model("Reviews", reviewschema);
 module.exports=Reviews;