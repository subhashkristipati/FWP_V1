const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    _id: {type: Number},
    username: {type: String, required: true},
    email: {type: String, required: true, unique:  true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    products: {type: Array}
    },
    { collection: 'sellers'}
)

const model = mongoose.model('sellerSchema', sellerSchema)
module.exports = model