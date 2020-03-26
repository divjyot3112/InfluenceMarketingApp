const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserSchema = require("../models/User").schema
// const MessageSchema = require("../models/Message").schema

// var AutoIncrement = require('mongoose-sequence')(mongoose);

var ConversationSchema = new Schema({
    // conversation_id: { type: Number, unique: true },
    firstUser: String, // User 1 email
    secondUser: String, // User 2 email
    conversation: [String] // Message ids array
});

// ConversationSchema.plugin(AutoIncrement, { id: "conversation_seq", inc_field: "conversation_id" });

module.exports = Conversation = mongoose.model('Conversation', ConversationSchema); 