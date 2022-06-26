const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    authId: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);