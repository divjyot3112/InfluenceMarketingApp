const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = require("../models/Task").schema
const RatingSchema = require("../models/Rating").schema
const CategorySchema = require("../models/Category").schema
const ConversationSchema = require("../models/Conversation").schema
const NameSchema = require("../models/Name").schema
const AddressSchema = require("../models/Address").schema

var InfluencerProfileSchema = new Schema({
    email: { type: String, unique: true },
    profilePic: String,
    gender: String,
    followersCount: Number,
    aboutMe: String,
    phone: String,
    tasksApplied: [TaskSchema],
    ratings: [RatingSchema],
    taskCategories: [CategorySchema],
    conversations: [ConversationSchema],
    name: NameSchema,
    tasksCompleted: [TaskSchema],
    profileViewCount: Number,
    dateOfBirth: { type: Date, default: Date.now },
    address: AddressSchema
});

module.exports = InfluencerProfile = mongoose.model('InfluencerProfile', InfluencerProfileSchema); 