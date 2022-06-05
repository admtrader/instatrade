const express = require('express');
const Post = require('../models/post');

const indexPage = (req,res) => {
    Post.find({})
    .then(posts => res.render('index', {posts}));
};

const showNew = (req, res) => {
    res.render('post/new.ejs')
}

const createPost = (req, res) => {
    console.log(req.body)
    Post.create(req.body)
    .then(post => res.redirect('/post'))
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