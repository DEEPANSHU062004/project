const Listing = require("../models/listing");
const Reviews = require("../models/Reviews");



module.exports.reviewsCreate=async(req,res)=>{
    
  let listing= await Listing.findById(req.params.id);
  // console.log(listing);
  let newReviews= new Reviews(req.body.reviews);
  newReviews.author=req.user._id;
 listing.reviews.push(newReviews);
 await newReviews.save();
 await listing.save();
 req.flash("success","New Review Created");         

    res.redirect(`/listings/${listing.id}`);
};

module.exports.destroy=async(req,res)=>{
   let {id,reviewsId}=req.params;

  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewsId}});
   await Reviews.findByIdAndDelete(reviewsId);
      req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`)

};