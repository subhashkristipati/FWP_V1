const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    _id: {type: Number},
    name : {type: String},
    quantity : {type: Number},
    price: {type: Number},
    img: {type: String}
},{collection: 'Cart'})

const Cart = mongoose.model('Cart',cart)

module.exports = Cart