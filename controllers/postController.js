const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');

const indexPage = (req,res) => {
    Post.find({})
    .then(posts => res.json(posts))
    //.then(posts => res.render('index', {posts}));
};

const showNew = (req, res) => {
    res.render('post/new.ejs')
}

const createPost = (req, res) => {
    console.log("create post route hit")
    Post.create({
        name: req.body.name,
        date: req.body.date,    
        body: req.body.body,
        imageUrl: req.body.imageUrl,

    })
    .then(post => {
        User.findOneAndUpdate({"email": req.user.email}, {$push: {posts: post._id}})
        .then(user => console.log(user.posts))})
    .then(res.json('Post was created successfully'))
};

const showOnePost = (req, res) => {
    Post.findById(req.params.id)
    //.then(post => res.render('post/show.ejs', {post}))
    .then(post => res.json(post))
}

const deletePost = (req, res) => {
    console.log('delete route hit')
    console.log(req.params.id)
    Post.findByIdAndDelete(req.params.id)
    .then(res.send("Post was deleted"))
}

const updatePost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id)
    .then(res.send("post was updated succesfully"))
}

module.exports = {
    indexPage,
    createPost,
    showNew,
    deletePost,
    showOnePost,
    updatePost,
    
}