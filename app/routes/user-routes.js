module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    const UserController = require('../controllers/UserController');

    // POST - Create user
    router.post('/', function (req, res, next) {
        UserController.createUser(req, res, next, passport);
    });

    // POST - Login user
    router.post('/login', function (req, res, next) {
        UserController.loginUser(req, res, next, passport);
    });

    // POST - Login user with Google
    router.get('/login/google', function (req, res, next) {
        UserController.googleLogin(req, res, next, passport);
    });

    //GET - Callback from Google+ API
    router.get('/login/google/callback/', function (req, res, next) {
        UserController.googleCallback(req, res, next, passport);
    });

    return router;

};