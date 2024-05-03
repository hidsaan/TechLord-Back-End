const mongoose = require('mongoose')

const Product = mongoose.model('Product', {

    title: String,
    imageUrl: String,
    description: String,
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


module.exports = Product