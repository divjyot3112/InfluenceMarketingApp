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
    }, { upsert: true, useFindAndModify: false }, (err1, result1) => {
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

router.post('/markread', (req, res) => {
    console.log('Inside Post mark read Request');
    console.log(req.body)
    
    Conversation.update({
        $or: [{ firstUser: req.body.current, secondUser: req.body.other }, { firstUser: req.body.other, secondUser: req.body.current }],
    },
        {
        $set:{"conversation.$[elem].read" : true}
        }, {
        arrayFilters:[{ "elem.author": req.body.other }]
    }, (err1, result1) => {
        if (err1) {
            console.log(err1);
            res.status(400).json({ success: false, message: "Messages could not be marked read" });
        }
        res.status(200).json({success:true,message:"Messages marked read"})
    })
})

module.exports = router;
