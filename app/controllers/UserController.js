'use strict'
// Load the user model
const User = require('../models/user');

var UserController = {
    createUser: createUser,
    loginUser: loginUser
};

function createUser(req, res, next, passport) {
  passport.authenticate('local-signup', {
    session: false
  }, function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({error: 'Auth Error!'});
    }
    res.json({
      id: user._id,
      email: user.local.email
    });
  })(req, res, next);
};

function loginUser(req, res, next, passport) {
  passport.authenticate('local-login', {
    session: false
  }, function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({error: 'Auth Error!'});
    }
    res.json({
      id: user._id,
      email: user.local.email
    });
  })(req, res, next);
};

module.exports = UserController;
