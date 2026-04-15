const express = require('express');
const user = require('../models/user');
const { errors } = require('passport-local-mongoose');
const Router = express.Router();
const passport = require('passport');
const { saveUrlRedirect } = require('../middleware');
const userController=require('../controllers/user')

Router.route("/signup")
.get(userController.renderSignup)
.post(userController.signup);

Router.route("/login")
.get(userController.renderlogin)
.post(
   saveUrlRedirect,
   passport.authenticate("local",
   {failureRedirect:"/login",failureFlash:true,}),
   userController.logIn
);


 //logout
 Router.get("/logout",userController.logout)
 module.exports=Router;
 