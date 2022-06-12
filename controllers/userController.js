const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');

const profilePage = (req,res) => {
    console.log(req.oidc.user)
    User.findOne({"email": req.oidc.user.email})
    .populate('posts')
    .then(user => res.render('user/profile', {user}))
};



const createUser = (req, res) => {
    User.findOne({ 'email': req.oidc.user.email})
    .then(user => {
        if(user === null) {
            //first time login user is added to db
            const newUser = new User({
                name: req.oidc.user.nickname,
                username: req.oidc.user.name,
                email: req.oidc.user.email,
                authId: req.oidc.user.sub,
            });
            newUser.save();
            res.redirect('/user/profile')
        }else {
            // user is already in db
            res.redirect('/post')
        }
    });
};

const logInOut = (req, res) => {
    let auth =  req.oidc.isAuthenticated()
    let user = req.oidc.user
    if(auth){
        res.redirect('/user/setup');
    }else
    res.send({msg: ' you succefully logged out now you need to login'})
};



module.exports = {
    profilePage,
    createUser,
    logInOut,
    
}