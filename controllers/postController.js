const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');

const indexPage = (req,res) => {
    Post.find({})
    .then(posts => res.render('index', {posts}));
};

const showNew = (req, res) => {
    res.render('post/new.ejs')
}

const createPost = (req, res) => {
    console.log(req.body)
    console.log(req.file)
    let imgName = req.file.originalname;
    let imgType = req.file.mimetype;
    let imgData = req.file.buffer;
    Post.create({
        name: req.body.name,
        date: req.body.date,    
        body: req.body.body,
        image: {
            name:imgName,
            imgFile: {
                data: imgData,
                contentType: imgType
            }
        }
    })
    .then(post => {
        User.findOneAndUpdate({"email": req.oidc.user.email}, {$push: {posts: post._id}})
        .then(user => console.log(user))
    })
    .then(res.redirect('/post'));
};

const showOnePost = (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.render('post/show.ejs', {post}))
}

const deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(post => res.redirect('/post'))
}


module.exports = {
    indexPage,
    createPost,
    showNew,
    deletePost,
    showOnePost,
    
}