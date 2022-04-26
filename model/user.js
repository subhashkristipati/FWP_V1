const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique:  true},
    name: {type: String, required: true},
    password: {type: String, required: true}

},{ collection: 'users', timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User




