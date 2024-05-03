const mongoose = require('mongoose')

const Soldproduct = mongoose.model('Soldproduct', {

    name: String,
    imageUrl: String,
    description: String,
    usedfor: String,
    condition: String,
    reviews: [
        {
            review: String,

            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],

    price: String,
    rating: [],

})


module.exports = Soldproduct