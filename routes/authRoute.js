const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const genPassword = require('../config/passwordUtil').genPassword;
const validPassword = require('../config/passwordUtil').validPassword;
const issueJWT = require('../config/JwtUtil').issueJWT;

router.post('/signup', (req, res, next) => {
  const saltHash = genPassword(req.body.pw);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    email: req.body.email,
    hash: hash,
    salt: salt,
  })

  newUser.save()
    .then((user) => {
      console.log(user)
      res.send('User Created Successfully');
    })
});

router.post('/login', (req, res, next) => {
  console.log('login route hit')
  console.log(req.body);
  User.findOne({ username: req.body.uname })
    .then(user => {
      if(!user) {
        res.status(401).json({ success: false, msg: 'no user in db'})
      }
      const isValid = validPassword(req.body.pw, user.hash, user.salt)
      if(isValid) {
        console.log("user is valid and password is correct, sending token now")
        const tokenObject = issueJWT(user);
        res.status(200).json({ token: tokenObject.token })
      } else {
        res.status(401).json({ success: false, msg: "you entered the wrond pw" })
      }
    })
    .catch(err => {
      next(err)
    })

});

module.exports = router;