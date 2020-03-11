const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NameSchema = new Schema({
    firstName: String,
    lastName: String
});

module.exports = Name = mongoose.model('Name', NameSchema); 