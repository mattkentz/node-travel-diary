module.exports = function (passport) {
    const LocalStrategy = require('passport-local').Strategy;
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    const User = require('../models/user');

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

    //Username and Password Login
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

    passport.use(new GoogleStrategy({
            clientID: '541494035924-fqvmd1f0355fk8t2qr60sl24jf28j3qs.apps.googleusercontent.com',
            clientSecret: 'HQRI8i2HGvCGlCoiEltfVLey',
            callbackURL: process.env.ROOT_URL + "/api/users/login/google/callback/"
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({
                    'google.id': profile.id
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        user = new User({
                            google: {
                                name: profile.displayName,
                                email: profile.emails[0].value,
                                username: profile.username,
                                provider: 'google',
                                id: profile.id
                            }
                        });
                        user.save(function(err) {
                            if (err) console.log(err);
                            return done(err, user);
                        });
                    } else {
                        return done(err, user);
                    }
                });
            })
        }
    ));
}

