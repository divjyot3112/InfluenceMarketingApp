const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AddressSchema = new Schema({
    streetAddress: String,
    city: String,
    state: String,
    country: String,
    zipcode: String
});

module.exports = Address = mongoose.model('Address', Address); 