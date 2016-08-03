var express = require('express');
var app = require('../../server');
var router = express.Router();
const DestinationController = require('../controllers/DestinationController');
const jwt = require('jsonwebtoken');

/*
Unauthenticated Routes
 */

// GET - Get all destinations
router.get('/', DestinationController.getDestinations);

// GET - Get a specific destination by id
router.get('/:destination_id', DestinationController.getDestinationById);

// Route middleware to verify a token - can be turned off with environment variable
if (!process.env.IGNORE_AUTH) {
    router.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('auth_secret'), function(err, decoded) {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            // if there is no token return an error
            return res.status(401).json({
                success: false,
                message: 'No token provided.'
            });

        }
    });
}

/*
 Authenticated Routes
 */

// POST - Create destination and send back all destinations after creation
router.post('/', DestinationController.createDestination);

// POST - Update destination details
router.post('/:destination_id', DestinationController.updateDestination);

// DELETE - Delete a destination by id
router.delete('/:destination_id', DestinationController.deleteDestination);

module.exports = router;