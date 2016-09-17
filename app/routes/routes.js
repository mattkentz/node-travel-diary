

// expose the routes to our app with module.exports
module.exports = function(app, passport) {
    const path = require('path');

    const DestinationRouter = require('./destination-routes');
    const UserRouter = require('./user-routes')(passport);
    const UserController = require('../controllers/UserController');

    app.get('/api/users/login/google/callback/', function (req, res, next) {
        UserController.googleCallback(req, res, next, passport);
    });

    // Destination routes
    app.use('/api/destinations', DestinationRouter);

    // User routes
    app.use('/api/users', UserRouter);

    /*
     * Application Routes
     */
    app.get('/', function(req, res) {
        res.sendFile('/app/index.html', { root: path.join(__dirname, '../../public') });
    });

};
