'use strict'
// Load the user model
const User = require('../models/user');

module.exports = function (app) {
  // POST - Create a user
  app.post('/api/users', function createUser(req, res) {
    let newUser = new User ({
      email: req.body.email.toLowerCase(), //convert to LowerCase to prevent duplicates
      password: req.body.password
    });


    newUser.save(function (err, data) {
      if (err) {
          res.send(err);
      } else {
          res.sendStatus(201);
      }
    });
  });

  app.post('/api/users/login', function userLogin(req, res) {
    User.findOne({
      email: req.body.email.toLowerCase()
    }).exec(function processUserLogin(err, user) {
      if (err)
        res.send(err);

      user.comparePassword(req.body.password, function compareUserPassword(err, isMatch) {
        if (err)
          res.send(err);

        if (isMatch) {
          res.send("Logged in!");
        } else {
          res.send("Invalid Login!");
        }
      });
    });
  });
}
