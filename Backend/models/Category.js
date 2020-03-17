const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategorySchema = new Schema({
    description: String
});


module.exports = Category = mongoose.model('Category', CategorySchema); 