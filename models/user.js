const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    hash: String,
    salt: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);