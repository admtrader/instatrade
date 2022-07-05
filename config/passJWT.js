const fs = require('fs');
const path = require('path');
const User = require('../models/user')
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// Authorization: Bearer <key>

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, (payload, doneCB) => {
  
  User.findOne({ _id: payload.sub })
    .then(user => {
      if(user) {
        return doneCB(null, user);
      } else {
        return doneCB(null, false);
      }
    })
    .catch(err => doneCB(err, null))


});


passport.use(strategy);