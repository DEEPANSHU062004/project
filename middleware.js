const Listing = require("./models/listing");
const Reviews = require("./models/Reviews");
const { findById } = require("./models/Reviews");
const {listingsSchema,reviewSchema}= require('./sechma.js');
const ExpressError = require('./utils/expressError.js');




module.exports.isLogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listings");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveUrlRedirect=(req,res,next)=>{
    if(req.session.redirectUrl){
         res.locals.redirectUrl=req.session.redirectUrl;
    }
   next();
};

module.exports.isOwner=async(req,res,next)=>{
        let {id}= req.params;
let listing= await Listing.findById(id);
if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","you don't have permission to edit");
    return res.redirect("/listings")
}
    next();
};

module.exports.isreviewsAuthor = async (req, res, next) => {
  let { id, reviewsId } = req.params;
  let review = await Reviews.findById(reviewsId);

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to delete");
    return res.redirect(`/listings/${id}`);
  }

  next();
};


module.exports.validateListing =(req,res,next)=>{
let {error} =listingsSchema.validate(req.body);
if(error){
 let result= error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400, result)
}else{
    next();
}
};


module.exports.reviewListing =(req,res,next)=>{
let {error} =reviewSchema.validate(req.body)
if(error){
 let result= error.details.map((el)=>el.message).join(",");
    throw new ExpressError(404, result)
}else{
    next();
}
};