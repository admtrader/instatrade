const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');

//Fetch the users profile and all their posts and populate the post data
const getProfile = (req, res) => {
  //need to change this to a db querry and populate the posts.
  console.log(req.user)
  User.findOne({ email: req.user.email })
  .populate('posts')
  .then(user => {
    res.json(user)
  })
};




module.exports = {
  getProfile,
}