// set up ========================
const express  = require('express');
const app      = express();                               // create our app w/ express
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const passport = require('passport');
const database = require('./app/config/database');

// configuration =================
const port = process.env.PORT || 8080;

// App must be exported before routes are required to avoid circular dependencies
module.exports = app;

database.connect(); // connect to Mongo database

app.use(bodyParser.json()); // get all data/stuff of the body (POST) parameters - parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use('/libraries', express.static(__dirname + '/node_modules')); //Make node_modules available to the front end application
app.set('auth_secret', process.env.AUTH_SECRET || 'traveldiarysecret'); //Token secret for local authentication

// Authentication using Passport
require('./app/config/passport')(passport);
app.use(passport.initialize());

// Routes
require('./app/routes/routes')(app, passport);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log(`App listening on port ${port}`);
