

// expose the routes to our app with module.exports
module.exports = function(app) {
require('./controllers/TodoController')(app);
  
  // application -------------------------------------------------------------
  app.get('/', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

};
