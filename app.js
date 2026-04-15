if(process.env.NODE_ENV != "production"){
require('dotenv').config() // or import 'dotenv/config' if you're using ES6
};


const express = require('express');
const app = express();
const mongoose=require('mongoose');
const path = require('path');
const methodOverride= require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError.js');
const Session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash =require('connect-flash')

const listingsRouter = require('./router/listing.js');
const ReviewsRouter = require('./router/reviews.js');
const userRouter= require('./router/user.js');


const { count } = require('console');
const passport =require('passport');
const LocalStrategy =require('passport-local');
const User= require('./models/user.js');
const { register } = require('module');



app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,("public"))));

//const mongo_url='mongodb://127.0.0.1:27017/wanderlust';
const dbURL= process.env.ATLASDB_URL

main().then(()=>{console.log("working")}).catch(()=>console.log("not good"));
async function main(){
    mongoose.connect(dbURL);
};

const store= MongoStore.create({
  mongoUrl:dbURL,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});
store.on("error",()=>{
  console.log("error in mongo session",err)
})

app.use(Session({
  store:store,
  secret:process.env.SECRET,
  resave:false,saveUninitialized:true,
  cookie:{
    expires:Date.now()+15*24*60*60*1000,
    maxAge:15*24*60*60*1000,
    httpOnly:true,
  }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.currUser=req.user;
  next();
});
app.use((req,res,next)=>{
  res.locals.error=req.flash("error");
  next();
}); 


app.use("/listings",listingsRouter)
app.use("/listings/:id/reviews",ReviewsRouter)
app.use("/",userRouter)
app.get("/privacy",(req,res)=>{
  res.render("footer/privacy.ejs");
})
app.get("/terms",(req,res)=>{
  res.render("footer/terms.ejs")
})

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;   // fallback to 500 if undefined
  const message = err.message || "Internal Server Error";
//  res.status(status).send(message);
res.render("error",{message})
});

app.get("/listings", async (req, res) => {
  console.log("🔥 ROUTE HIT");

  let { category } = req.query;
  console.log("👉 category:", category);

  const listings = await Listing.find({});
  console.log("👉 total in DB:", listings.length);

  res.render("listings/index.ejs", { allList: listings });
});

app.listen("8080",()=>{
    console.log("app open")
});
