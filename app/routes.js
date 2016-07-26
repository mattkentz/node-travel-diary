

// expose the routes to our app with module.exports
module.exports = function(app, passport) {
    const path = require('path');
    const DestinationController = require('./controllers/DestinationController');
    const UserController = require('./controllers/UserController');

  /*
   * Destination Routes
   */

   // GET - Get all destinations
   app.get('/api/destinations', DestinationController.getDestinations);

   // GET - Get a specific destination by id
   app.get('/api/destinations/:destination_id', DestinationController.getDestinationById);

   // POST - Create destination and send back all destinations after creation
   app.post('/api/destinations', DestinationController.createDestination);

   // POST - Update destination details
   app.post('/api/destinations/:destination_id', DestinationController.updateDestination);

   // DELETE - Delete a destination by id
   app.delete('/api/destinations/:destination_id', DestinationController.deleteDestination);

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
      res.sendFile('/app/index.html', { root: path.join(__dirname, '../public') });
  });

};
