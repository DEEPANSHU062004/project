const mongoose=require('mongoose');
const initData=require('./data');
const Listing =require('../models/listing')
main().then(()=>{console.log("working")}).catch(()=>console.log("not good"));
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
};
const initDB= async() => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"69837ee8f769ed351310763b",}));
    await Listing.insertMany(initData.data);
    console.log("db is inslized")
};
initDB();