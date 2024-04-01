const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://cdn4.vectorstock.com/i/1000x1000/89/13/user-login-icon-vector-21078913.jpg',
    },

}, {timestamps : true})

const User = mongoose.model('User', userSchema);

module.exports = User;