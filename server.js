// set up ========================
const express  = require('express');
const app      = express();                               // create our app w/ express
const mongoose = require('mongoose');                     // mongoose for mongodb
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const database = require('./config/database');

// configuration =================
const port = process.env.PORT || 8080;
// connect to Mongo database
mongoose.connect(database.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log(`App listening on port ${port}`);

exports = module.exports = app;
