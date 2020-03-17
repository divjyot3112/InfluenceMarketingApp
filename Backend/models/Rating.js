const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = require("../models/Task").schema

var RatingSchema = new Schema({
    rating: Number,
    ratedOn: { type: Date, default: Date.now },
    task: TaskSchema, //added Task instead of task_id verify
    influencer: String //added influencer //Adding only email id as it gives error if interdependent schemas
});

module.exports = Rating = mongoose.model('Rating', RatingSchema); 