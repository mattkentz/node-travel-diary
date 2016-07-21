

// expose the routes to our app with module.exports
module.exports = function(app) {
require('./controllers/DestinationController')(app);
require('./controllers/UserController')(app);

  // application -------------------------------------------------------------
  app.get('/', function(req, res) {
      res.sendFile('./public/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

};
