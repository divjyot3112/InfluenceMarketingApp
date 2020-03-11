const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AutoIncrement = require('mongoose-sequence')(mongoose);

var CategorySchema = new Schema({
    category_id: { type: Number, unique: true },
    description: String
});

CategorySchema.plugin(AutoIncrement, { id: "category_seq", inc_field: "category_id" });

module.exports = Category = mongoose.model('Category', CategorySchema); 