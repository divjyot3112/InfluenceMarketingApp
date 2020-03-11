const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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