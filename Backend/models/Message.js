const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AutoIncrement = require('mongoose-sequence')(mongoose);

var MessageSchema = new Schema({
    message_id: { type: Number, unique: true },
    sender: String,
    receiver: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
});

MessageSchema.plugin(AutoIncrement, { id: "message_seq", inc_field: "message_id" });

module.exports = Message = mongoose.model('Message', MessageSchema); 