'use strict'
// Load the user model
const User = require('../models/user');

module.exports = function (app) {
  // POST - Create a user
  app.post('/api/users', function (req, res) {
    let newUser = new User ({
      email: req.body.email,
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
}
