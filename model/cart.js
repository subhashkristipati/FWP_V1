const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    prod_id: {type: String,
        unique: [true,'Item already in cart']
    },
    name : {type: String},
    quantity : {type: Number},
    price: {type: Number},
    mrp : {type : Number},
    img: {type: String}
},{collection: 'Cart'})

const Cart = mongoose.model('Cart',cart)

module.exports = Cart