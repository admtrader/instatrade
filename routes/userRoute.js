const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const config = require('../config/auth0');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

router.use(auth(config));


// req.isAuthenticated is provided from the auth router

router.get('/', userCtrl.logInOut)

router.get('/user/setup', requiresAuth(), userCtrl.createUser)

router.get('/user/profile', requiresAuth(), userCtrl.profilePage);





module.exports = router;