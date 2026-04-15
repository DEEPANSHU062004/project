const Listing = require("../models/listing");


module.exports.index=async(req,res)=>{
   const allList= await Listing.find({});


  let { category } = req.query;
  let listings;

  if (category) {
    listings = await Listing.find({
      category: { $regex: category, $options: "i" }
    });
  } else {
    listings = await Listing.find({}); // ya empty bhi kar sakta hai
  }


  res.render("listings/index.ejs", { allList: listings });
  // console.log(allList);
  
};
module.exports.creatingRanderForm=(req,res)=>{
    
    res.render("listings/new");
};

module.exports.creating=async(req,res)=>{
//    let { title, description, country, location, price}=req.body;
let url=req.file.path ;
let filename =req.file.filename;

      let listing = new Listing(req.body.listing);
      console.log(req.file)
      listing.owner=req.user._id;
      listing.image={url,filename};
      await listing.save(); 
      req.flash("success","New Listing Created");
    res.redirect("/listings");
};


module.exports.show=async(req,res)=>{
    let {id}= req.params;const List = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: { path: "author" }   // populate the user inside each review
  })
  .populate("owner");

   console.log(List);
 if(!List){
     req.flash("error","listing You request for does not exits");
    return res.redirect("/listings");
 };
    res.render("listings/show",{List})

}; 
module.exports.edit=async(req,res)=>{
    let {id}= req.params;
    const List= await Listing.findById(id);
    //console.log(List);
     if(!List){
     req.flash("error","listing You request for does not exits");
    return res.redirect("/listings");
 };
    res.render("listings/edit",{List});
};

module.exports.editPut=async(req,res)=>{
    let {id}= req.params;

    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
   // console.log(listing);
   if(typeof req.file !== "undefined" ){
    let url=req.file.path ;
    let filename =req.file.filename;
   listing.image={url,filename};
    await listing.save();
   }
    req.flash("success","Listing Updated!");

    res.redirect(`/listings/${id}`);
};
module.exports.destroy=async(req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndDelete(id);
      req.flash("success","Listing Deleted!");         
    res.redirect("/listings")
};