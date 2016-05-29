// load the destination model
var Destination = require('../models/destination');

// expose the routes to our app with module.exports
module.exports = function(app) {

  // api ---------------------------------------------------------------------
  // get all destinations
  app.get('/api/destinations', function(req, res) {
      getDestinations(res);
  });

  // get a specific destination
  app.get('/api/destinations/:destination_id', function(req, res) {
    // get and return all the destinations after you create another
    Destination.findOne({ '_id': req.params.destination_id }, function(err, destination) {
        if (err)
            res.send(err)
        res.json(destination);
    });

  });

  // create destination and send back all destinations after creation
  app.post('/api/destinations', function(req, res) {
      console.log(req);
      // create a destination, information comes from AJAX request from Angular
      Destination.create({
          name : req.body.name,
          description : req.body.description,
          image: {
            data : req.body.image ? req.body.image.data : null,
            contentType: req.body.image ? req.body.image.contentType : null
          }
      }, function(err, destination) {
          if (err)
              res.send(err);

          getDestinations(res);
      });

  });

  // create destination and send back all destinations after creation
  app.post('/api/destinations/:destination_id', function(req, res) {
      console.log(req);
      var updatedDestination = req.body;
      // create a destination, information comes from AJAX request from Angular
      Destination.update(
        { _id : req.params.destination_id }, updatedDestination, function(err, destination) {
          if (err)
              res.send(err);
      });

  });

  // delete a destination
  app.delete('/api/destinations/:destination_id', function(req, res) {
      Destination.remove({
          _id : req.params.destination_id
      }, function(err, destination) {
          if (err)
              res.send(err);

          getDestinations(res);
      });
  });

  function getDestinations (res) {
    // get and return all the destinations after you create another
    Destination.find().select('name').exec(function(err, destinations) {
        if (err)
            res.send(err)
        res.json(destinations);
    });
  };

};
