const express = require('express');
const User = require('../models/user');

const indexPage = (req,res) => {
    User.find({})
    .then(idx => res.render('index', {idx}));
};

const showNew = (req, res) => {
    res.render('user/new.ejs')
}

const createUser = (req, res) => {
    console.log(req.body)
    User.create(req.body)
    .then(user => res.redirect('/user'))
};


module.exports = {
    indexPage,
    createUser,
    showNew,
    
}