// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Destination', {
    name : String,
    description: String,
    image: { data: Buffer, contentType: String }
});
