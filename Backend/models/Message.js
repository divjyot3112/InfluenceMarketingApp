const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    sender: String,
    receiver: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = Message = mongoose.model('Message', MessageSchema); 