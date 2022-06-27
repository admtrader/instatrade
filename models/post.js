const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: String,
    date: String,
    body: String,
    imageUrl: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = mongoose.model('Post', postSchema);