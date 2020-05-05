const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecommendationsSchema = new Schema({
    email: String, // influencer email
    tasks: [String]
});


module.exports = Recommendations = mongoose.model('Recommendations', RecommendationsSchema,"recommended_tasks"); 