'use strict';
// Load the destination model
var Destination = require('../models/destination');
var multiparty = require('multiparty');

// expose the routes to our app with module.exports
module.exports = function(app) {

  /* ------ API ------ */

  // Get all destinations
  app.get('/api/destinations', function(req, res) {
      getDestinations(res);
  });

  // Get a specific destination
  app.get('/api/destinations/:destination_id', function(req, res) {
    // lean() used to return Javascript object in callback rather than model object
    Destination.findById(req.params.destination_id).lean().exec(function(err, destination) {
        if (err)
            res.send(err)
        destination.image.data = destination.image.data.toString('base64');
        res.json(destination);
    });

  });

  // Create destination and send back all destinations after creation
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

  // Update destination details
  app.post('/api/destinations/:destination_id', function(req, res) {
      var destination = {
        _id: req.params.destination_id
      }
      var form = new multiparty.Form();

      // Errors may be emitted
      // Note that if you are listening to 'part' events, the same error may be
      // emitted from the `form` and the `part`.
      form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
      });

      // Parts are emitted when parsing the form
      // Parts are Readable Streams
      form.on('part', function(part) {
        if (!part.filename) {
          if (part.name === 'name') {
              destination.name = '';
              part.on('data', function (chunk) {
                destination.name += chunk.toString();
              });

              part.on('end', function () {
                  part.resume();
              });
          } else if (part.name === 'description') {
              destination.description = '';
              part.on('data', function (chunk) {
                destination.description += chunk.toString();
              });

              part.on('end', function () {
                  part.resume();
              });
          }

          part.resume();
        }

        if (part.filename) {
          destination.image = {
            contentType: part.headers['content-type']
          }
          let bufs = [];
          part.on('data', function (chunk) {
            bufs.push(chunk);
          });

          part.on('end', function () {
              destination.image.data = Buffer.concat(bufs);
            //  console.log(destination.image.data.toString('base64'))
              part.resume();
          });
        }

        part.on('error', function(err) {
          // decide what to do
        });
       });

      // Close emitted after form parsed
      form.on('close', function() {
        Destination.update(
          { _id : req.params.destination_id }, destination,
          function(err, destination) {
            if (err)
                res.send(err);
        });
        res.end('File uploaded');
      });

      // Parse req
      form.parse(req);
  });

  // Delete a destination
  app.delete('/api/destinations/:destination_id', function(req, res) {
      Destination.remove({
          _id : req.params.destination_id
      }, function(err, destination) {
          if (err)
              res.send(err);

          getDestinations(res);
      });
  });

  // Return destinations to a response object
  function getDestinations (res) {
    Destination.find().select('name').exec(function(err, destinations) {
        if (err)
            res.send(err)
        res.json(destinations);
    });
  };

};
