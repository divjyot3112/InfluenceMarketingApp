const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AutoIncrement = require('mongoose-sequence')(mongoose);

var RatingSchema = new Schema({
    rating_id: { type: Number, unique: true },
    rating: Number,
    ratedOn: { type: Date, default: Date.now },
    task: TaskSchema, //added Task instead of task_id verify
    influencer: String //added influencer //Adding only email id as it gives error if interdependent schemas
});

RatingSchema.plugin(AutoIncrement, { id: "rating_seq", inc_field: "rating_id" });

module.exports = Rating = mongoose.model('Rating', RatingSchema); 