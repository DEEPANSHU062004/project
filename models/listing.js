const mongoose =require('mongoose');
const { types, ref } = require('joi');
const Reviews = require("./Reviews")
const schema=mongoose.Schema
 const listingschema = new schema({
    title:{type:String,
    required:true},
    description: {
  type: String,
  required: [true, 'Description is required'],
  trim: true,
  validate: {
    validator: function(v) {
      return v && v.trim().length > 0; // whitespace-only reject
    },
    message: 'Description cannot be empty or whitespace'
  }
}
,
    image:{
       filename:{type:String},
       url:{type:String},},
    price:Number,
    location:String,
    country:String,
    reviews:[{type:schema.Types.ObjectId,
      ref:"Reviews"
    }],
    owner:{type:schema.Types.ObjectId,
      ref:"User"
    },
    category:{
      type:String,
      Enumerator:["Trending","rooms","mountains","iconic city","Ammazing Pool","castles","Camping","Farms","Snow","skating","Beachfront","National Park"]
    }
 });

 listingschema.post("findOneAndDelete", async(listing)=>{
  if(listing){
  await Reviews.deleteMany({id : {$in: listing.reviews}}); 
}}
)
 const Listing = mongoose.model("Listing",listingschema);
 module.exports = Listing;