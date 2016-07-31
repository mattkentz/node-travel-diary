var express = require('express');
var router = express.Router();
const DestinationController = require('../controllers/DestinationController');

// GET - Get all destinations
router.get('/', DestinationController.getDestinations);

// GET - Get a specific destination by id
router.get('/:destination_id', DestinationController.getDestinationById);

// POST - Create destination and send back all destinations after creation
router.post('/', DestinationController.createDestination);

// POST - Update destination details
router.post('/:destination_id', DestinationController.updateDestination);

// DELETE - Delete a destination by id
router.delete('/:destination_id', DestinationController.deleteDestination);

module.exports = router;