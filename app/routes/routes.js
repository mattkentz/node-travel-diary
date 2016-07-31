

// expose the routes to our app with module.exports
module.exports = function(app, passport) {
    const path = require('path');
    const UserController = require('./../controllers/UserController');

    const DestinationRouter = require('./destination-routes');
    /*
   * Destination Routes
   */

    app.use('/api/destinations', DestinationRouter);

   /*
    * User Routes
    */

    // POST - Create user
    app.post('/api/users', function (req, res, next) {
        UserController.createUser(req, res, next, passport);
    });

    // POST - Update destination details
    app.post('/api/users/login', function (req, res, next) {
        UserController.loginUser(req, res, next, passport);
    });

   /*
    * Application Routes
    */
  app.get('/', function(req, res) {
      res.sendFile('/app/index.html', { root: path.join(__dirname, '../../public') });
  });

};
