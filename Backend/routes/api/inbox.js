const express = require('express');
const router = express.Router();
const passport = require('passport');
const userRoles = require("../../utils/Constants").UserRoles;
// Bring in passport strategy
require('../../config/passport')(passport)

// Task Model
const Conversation = require('../../models/Conversation');
const User = require("../../models/User");
const InfluencerProfile = require("../../models/InfluencerProfile");
const SponsorProfile = require("../../models/SponsorProfile");

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

        /*
        let docs =  await Promise.all(Conversation.map(async conversation => {
           
            let profileInfo = await fetchUserDetails(user.email).then((profile) => profile)
            if (await profileInfo != null) {
                conversation = conversation.toJSON()
                conversation.photo = await profileInfo.profilePic,
                conversation.name= await profileInfo.name.firstName + " " + await profileInfo.name.lastName
                return conversation
            } else {
                console.log("Profile is null")
                return conversation
            }
        }))*/

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

router.get('/fetchusers', (req, res) => {
    console.log('Inside Get fetch all users Request');
    User.find().then(async (users) => {
        
        let docs =  await Promise.all(users.map(async user => {
           
            let profileInfo = await fetchUserDetails(user.email).then((profile) => profile)
            if (await profileInfo != null) {
                return  {
                    email: user.email,
                    photo: await profileInfo.profilePic,
                    name: await profileInfo.name.firstName + " " + await profileInfo.name.lastName
                }
            } else {
                console.log("Profile is null")
                return {
                    email: user.email
                }
            }
        }))
         res.status(200).json({ success: true, message:  docs })
    }).catch((err1) => {
        console.log(err1);
        res.status(400).json({ success: false, message: "No users found" });
    })
})


    /* For conversation Name and Image */
    let fetchUserDetails = (userid) => {
        console.log(userid)
        return User.findOne({ email: userid })
            .then((user) => {
                if (user) {
                    if (user.role === userRoles.SPONSOR) {
                        return SponsorProfile.findOne({ email: userid }).then((docs) => {
                            return docs
                        }).catch((err) => {
                            console.log(err)
                            return null
                        });
                    }
                    else {
                        return InfluencerProfile.findOne({ email: userid }).then((docs) => {
                            return docs
                        }).catch((err) => {
                            console.log(err)
                            return null
                        });
                    }
                }
                else return null;
            })
            .catch((err) => {
                console.log(err);
                return null;
            })
    }

module.exports = router;
