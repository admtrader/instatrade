const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
})

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);