const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const CategorySchema = require("../models/Category").schema

var TaskSchema = new Schema({
    title: String,
    postedBy: String, //Adding only email id as it gives error if interdependent schemas
    postedOn: { type: Date, default: Date.now },
    description: String,
    images: [String],
    status: String,
    salary: Number,
    category: String, // Category id
    appliedCandidates: [String], // User email array
    selectedCandidates: [String], // User email array
    vacancyCount: Number,
    startDate: Date,
    endDate: Date
});

module.exports = Task = mongoose.model('Task', TaskSchema); 