const express = require('express');
const Router = express.Router();
const wrapAsyc = require('../utils/wrapAsyc');
const { listingsSchema } = require('../sechma.js');
const ExpressError = require('../utils/expressError.js');
const Listing = require('../models/listing.js');
const { isLogin, isOwner, validateListing } = require('../middleware.js');
const path = require('path');
const listingsController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudconfgs.js")
const upload = multer({ storage })



Router.route("/")
    .get(wrapAsyc(listingsController.index))
    .post(
        upload.single('listing[image]'),
        wrapAsyc(listingsController.creating));



//create New Listing
Router.get("/new", isLogin, listingsController.creatingRanderForm);

Router.route("/:id")
    .get(wrapAsyc(listingsController.show))
    .put(
        isLogin,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        listingsController.editPut
    );//edit by put
//edit
Router.get("/:id/edit", isLogin, wrapAsyc(listingsController.edit));




//destory 
Router.get("/:id/delete"
    , isLogin,
    isOwner,
    listingsController.destroy);

module.exports = Router;