const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const TaskSchema = require("../models/Task").schema
// const RatingSchema = require("../models/Rating").schema
// const CategorySchema = require("../models/Category").schema
// const ConversationSchema = require("../models/Conversation").schema
// const NameSchema = require("../models/Name").schema
// const AddressSchema = require("../models/Address").schema

var InfluencerProfileSchema = new Schema({
    email: { type: String, unique: true },
    profilePic: String,
    gender: String,
    followersCount: Number,
    aboutMe: String,
    phone: String,
    tasksApplied: [String], // task id array
    ratings: [String], // Rating id array
    taskCategories: [String], // Category id array
    conversations: [String], // Conversation id array
    name: String, // Name id
    tasksCompleted: [String], // Task id Array
    profileViewCount: Number,
    dateOfBirth: { type: Date, default: Date.now },
    address: String // Address id
});

module.exports = InfluencerProfile = mongoose.model('InfluencerProfile', InfluencerProfileSchema); 