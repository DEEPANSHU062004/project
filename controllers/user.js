const user = require("../models/user");



module.exports.renderSignup=(req,res)=>{
    res.render("users/signup")
};

module.exports.signup=async(req,res)=>{
   try {
         let {username,email,password}=req.body
   const newUser= new user({username,email});
   const registerUser= await user.register(newUser,password);
   req.logIn(registerUser,(err)=>{
      if(err){
         next(err);
      }
   })
   req.flash("success","wellcome to wanderlust")
   res.redirect("/listings");
   } catch (er) {
      req.flash("error", er.message);
      console.log(er)
      res.redirect("/signup");
   }

};

module.exports.renderlogin=(req,res)=>{
    res.render("users/login")
 };

module.exports.logIn=async(req,res)=>{
   req.flash("success","wellcome back")
let redirecturl = res.locals.redirectUrl || "/listings";
   res.redirect(redirecturl);
 };

module.exports.logout=async(req,res)=>{
   req.logOut((err)=>{
   if(err){
      req.flash("error","err.messages")
      return next(err);
   }
   req.flash("success","You are logged out!");
   res.redirect("/listings")
})
}