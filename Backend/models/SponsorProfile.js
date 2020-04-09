const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const TaskSchema = require("../models/Task").schema
// const RatingSchema = require("../models/Rating").schema
// const ConversationSchema = require("../models/Conversation").schema
// const NameSchema = require("../models/Name").schema
// const AddressSchema = require("../models/Address").schema

var SponsorProfileSchema = new Schema({
    email: { type: String, unique: true },
    company: String,
    tasksPosted: [String], // task id array
    ratings: [String], // rating id array
    conversations: [String], // conversation id array
    name: String, // name id
    profilePic: String,
    phone: String,
    tasksCancelled: [String], // task id array
    address: {
        streetAddress: String,
        city: String,
        state: String,
        country: String,
        zipcode: String
    },
    aboutMe: String
});

module.exports = SponsorProfile = mongoose.model('SponsorProfile', SponsorProfileSchema); 