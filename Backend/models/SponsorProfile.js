const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = require("../models/Task").schema
const RatingSchema = require("../models/Rating").schema
const ConversationSchema = require("../models/Conversation").schema
const NameSchema = require("../models/Name").schema
const AddressSchema = require("../models/Address").schema

var SponsorProfileSchema = new Schema({
    email: { type: String, unique: true },
    company: String,
    tasksPosted: [TaskSchema],
    rating: [RatingSchema],
    conversations: [ConversationSchema],
    name: NameSchema,
    profilePic: String,
    phone: String,
    tasksCancelled: [TaskSchema],
    address: AddressSchema,
    aboutMe: String
});

module.exports = SponsorProfile = mongoose.model('SponsorProfile', SponsorProfileSchema); 