const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const path = require('path');

// Bring in passport strategy
require('../../config/passport')(passport)

// User Model
const User = require('../../models/User');
//Profile Models
const InfluencerProfile = require('../../models/InfluencerProfile');
const SponsorProfile = require('../../models/SponsorProfile');

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post('/login', (req, res) => {
    console.log('Inside Login Post Request');
    console.log(req.body.email, req.body.password);
    
    User.findOne({ email: req.body.email, flag: req.body.flag })
        .then(user => {
            if(user) { 
                
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if(isMatch && !err) {
                        res.status(200).json(user); 
                    } else {
                        res.status(400).send();
                    }
                });
            }
            else { res.status(404).send(); }
        })
        .catch(err => { console.log(err); res.status(400).send()})
});

// @route   PUT api/users/profile?email
// @desc    User profile update
// @access  Public
router.put('/profile', (req, res) => {
    console.log('Inside Update Profile put request');
    console.log("Profile to be updated: ", req.query.email);
    User.findOne({ email: req.query.email })
        .then(user => {
            console.log("User: ", user);
            if (user) {
                if (user.role == "Sponsor") {
                    SponsorProfile.findOneAndUpdate({ email: req.query.email },
                        {
                            $set: {
                                name: req.body.name,
                                taskCategories: req.body.taskCategories,
                                profilePic: req.body.profilePic,
                                phone: req.body.phone,
                                address: req.body.address,
                                aboutMe: req.body.aboutMe
                            }
                        },
                        { returnOriginal: false })
                        .then(res => res.status(200).json({ success: true, message: "Sponsor Profile updated successfully!" }))
                        .catch(err => res.status(400).json({ success: false, message: err }))
                }
                else {
                    InfluencerProfile.findOneAndUpdate({ email: req.query.email },
                        {
                            $set: {
                                name: req.body.name,
                                taskCategories: req.body.taskCategories,
                                profilePic: req.body.profilePic,
                                phone: req.body.phone,
                                address: req.body.address,
                                aboutMe: req.body.aboutMe
                            }
                        },
                        { returnOriginal: false ,useFindAndModify: false})
                        .then(result => res.status(200).json({ success: true, message: "Influencer Profile updated successfully!" }))
                        .catch(err => { console.log(err); res.status(400).json({ success: false, message: err }) })
                }
            }
            else { console.log(err);res.status(400).json({ success: false, message: "User not found" }); }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ success: false, message: err });
        })
});

module.exports = router;