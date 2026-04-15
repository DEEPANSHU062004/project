const mongoose =require('mongoose');
const { default: passportLocalMongoose } = require('passport-local-mongoose');
const pasportLocalMongoose=require("passport-local-mongoose");
const schema=mongoose.Schema
const userSchema= new schema({
    email:{
        type:String,
        required:true,},
});
userSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model("User",userSchema);
