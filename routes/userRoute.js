const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const passport = require('passport');

router.get('/profile', passport.authenticate('jwt', { session: false}), userCtrl.getProfile)

router.put('/profile', passport.authenticate('jwt', { session: false}), userCtrl.updateProfile)




module.exports = router;