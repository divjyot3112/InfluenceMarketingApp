const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in passport strategy
require('../../config/passport')(passport)

// Task Model
const Conversation = require('../../models/Conversation');

// @route   POST api/inbox/send
// @desc    Create a Conversation or add message
// @access  Public
router.post('/send', (req, res) => {
    console.log('Inside Inbox Send Request');
    Conversation.findOneAndUpdate({
        $or: [{ firstUser: req.body.sender, secondUser: req.body.receiver }, { firstUser: req.body.receiver, secondUser: req.body.sender }]
    }, {
        $set:{firstUser:req.body.sender, secondUser:req.body.receiver},
        $push: {conversation: req.body.message}
    }, { upsert: true }, (err1, result1) => {
        if (err1) {
            console.log(err1);
            res.status(400).json({ success: false, message: "Message could not be added" });
        }
        res.status(200).json({success:true,message:"Message sent"})
    })
});

router.get('/', (req, res) => {
    console.log('Inside Inbox Get Request');
    Conversation.find({
        $or: [{ firstUser: req.query.email}, { secondUser: req.query.email }]
    }).then((Conversation) => {
        res.status(200).json({success:true,message:Conversation})
    }).catch((err1) => {
        if (err1) {
            console.log(err1);
            res.status(400).json({ success: false, message: "Message could not be added" });
        }
    })
})

module.exports = router;
