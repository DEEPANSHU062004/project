const express = require('express');
const Router = express.Router({mergeParams:true});
const wrapAsyc= require('../utils/wrapAsyc');

const Reviews = require('../models/Reviews.js');
const Listing = require('../models/listing.js');
const {reviewListing,isLogin,isreviewsAuthor}= require('../middleware.js');
const ReviewController = require('../controllers/reviews.js')







//Reviews
//Post Route
Router.post("/",
  isLogin,
    reviewListing,
    wrapAsyc(ReviewController.reviewsCreate));

//Reviews
//delete
Router.delete("/:reviewsId",
  isLogin
  ,isreviewsAuthor,
  wrapAsyc(ReviewController.destroy));

module.exports=Router