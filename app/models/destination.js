'use strict'
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const  SALT_WORK_FACTOR = 10;

module.exports = mongoose.model('Destination', {
    name : {type: String, required: true},
    description: String,
    image: { data: Buffer, contentType: String }
});
