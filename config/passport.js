const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const validPassword = require('./passwordUtil').validPassword;

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw'
};

const verifyCallback = (username, password, doneCB) => {
  User.findOne({ username: username})
    .then((user) => {
      if(!user) {return doneCB(null, false)}
      
      const isValid = validPassword(password, user.hash, user.salt);

      if(isValid) {
        return doneCB(null, user);
      } else {
        return doneCB(null, false);
      }

    })
    .catch((err) => {
      doneCB(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
  .then((user) => {
    done(null, user);
  })
  .catch(err => done(err))
});


