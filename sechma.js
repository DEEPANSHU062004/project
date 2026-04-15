const joi= require('joi');
const Reviews = require('./models/Reviews');

module.exports.listingsSchema = joi.object({
  listing: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required().min(0),
    location: joi.string().required(),
    country: joi.string().required(),

    image: joi.object({
      url: joi.string().uri().required()
    }).optional(),   // 👈 THIS LINE FIXES ERROR
    category: joi.string()
      .valid(
        "Trending",
        "rooms",
        "mountains",
        "iconic city",
        "Ammazing Pool",
        "castles",
        "Camping",
        "Farms",
        "Snow",
        "skating",
        "Beachfront",
        "National Park"
      )
  }).required(),
});

module.exports. reviewSchema = joi.object({
    reviews:joi.object({
        rating:joi.number().min(1).max(5),
        comment:joi.string().required(),
    })

})
