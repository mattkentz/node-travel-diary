module.exports = function (passport) {
    const LocalStrategy = require('passport-local').Strategy;
    const User = require('../models/user');
    const flash = require('connect-flash');

    // Sign Up
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false);
                    } else {
                        var newUser = new User();
                        newUser.local.email    = email.toLowerCase(), //convert to LowerCase to prevent duplicates;
                        newUser.local.password = password; //will be hashed in the user model

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

    //Login
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect details.' });
                }
                if (!user.comparePassword(password, function (data, isMatch) {
                        if (!isMatch) {
                            return done(null, false, { message: 'Incorrect details.' }); // do not specify whether password or username was wrong to give hackers less info
                        } else {
                            return done(null, user); // Login Success
                        }
                    })) {
                }
            });
        }
    ));
}

