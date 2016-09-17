'use strict';
var app = require('../../server');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

var UserController = {
    createUser: createUser,
    loginUser: loginUser,
    googleLogin: googleLogin,
    googleCallback: googleCallback
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
    res.status(200).json({
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

    var token = jwt.sign(user, app.get('auth_secret'), {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    res.status(200).json({
      token: token
    });
  })(req, res, next);
};

function googleLogin(req, res, next, passport) {
  passport.authenticate('google', { session: false, scope : ['profile', 'email'] })(req, res, next);
}

function googleCallback(req, res, next, passport) {
  passport.authenticate('google',
      { session: false, successRedirect: '/', failureRedirect: '/' },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({error: 'Auth Error!'});
        }

        var token = jwt.sign(user, app.get('auth_secret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        var tokenString = encodeURIComponent(token);
        res.redirect('/angular-1x/#/destinations?token=' + tokenString);
  })(req, res, next);
}

module.exports = UserController;
