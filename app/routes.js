

// expose the routes to our app with module.exports
module.exports = function(app) {
const DestinationController = require('./controllers/DestinationController');
require('./controllers/UserController')(app);

  /*
   * Destination Routes
   */

   // GET - Get all destinations
   app.get('/api/destinations', DestinationController.getAllDestinations);

   // GET - Get a specific destination by id
   app.get('/api/destinations/:destination_id', DestinationController.getDestinationById);

   // POST - Create destination and send back all destinations after creation
   app.post('/api/destinations', DestinationController.createDestination);

   // POST - Update destination details
   app.post('/api/destinations/:destination_id', DestinationController.updateDestination);

   // DELETE - Delete a destination by id
   app.delete('/api/destinations/:destination_id', DestinationController.deleteDestination);

   /*
    * Application Routes
    */
  app.get('/', function(req, res) {
      res.sendFile('./public/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

};
