const express = require('express');
const router = express.Router();
const multer = require('multer');
var config = require('../../config/main');
const passport = require('passport');
const path = require('path');
const jwt = require('jsonwebtoken');
const userRoles = require('../../utils/Constants').UserRoles;
// Set up passport middleware
var requireAuth = passport.authenticate('jwt', {session: false});

// Bring in passport strategy
require('../../config/passport')(passport)

// Import models
const User = require('../../models/User');
const InfluencerProfile = require('../../models/InfluencerProfile')
const SponsorProfile = require('../../models/SponsorProfile')
const Name = require('../../models/Name')
const Address = require('../../models/Address')

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post('/login', (req, res) => {
    console.log('Inside Login Post Request');
    console.log(req.body.email, req.body.password);
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {                 
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if(isMatch && !err) {
                        // Creating token if password is a match and no errors
                        var token = jwt.sign({user}, config.secret, {
                            expiresIn: 10080 // In seconds
                        });
                        res.status(200).json({
                            message: "Login Successful", 
                            token: "Bearer " + token
                        }); 
                    } else {
                        res.status(401).json({ message: 'Incorrect Password' });
                    }
                });
            }
            else { res.status(404).json({ message: 'User not found' }) }
        })
        .catch(err => { 
            console.log(err); 
            res.status(404).json({ message: 'Something went wrong' });
        })
});

// @route   POST api/users/signup
// @desc    Signup User
// @access  Public
// router.post('/signup', (req, res) => {
//     console.log('Inside Signup Post Request', req.body.email);
//     res.setHeader('Content-Type', 'application/JSON');
//     res.setHeader('Content-Type', 'text/plain');
//     User.findOne({email: req.body.email})
//         .then(user => {
//             if(user){
//                 console.log('User already exists');
//                 res.status(400).send({"msg":"Email already exists"})
//             } else {
//                 console.log("User doesn't exist, creating new user", req.body);
//                 // Creating new user object
//                 const newUser = new User({
//                     email: req.body.email,
//                     password: req.body.password,
//                     isActive: req.body.isActive,
//                     role: req.body.role,
//                 });
//                 newUser.save()
//                     .then(user => { res.write("Created new user") })
//                     .catch(err => { console.log(err); res.write("Something went wrong while creating new user").end() })

//                 // Creating new profile object for the user
//                 console.log("Creating new influencer profile " + req.body.role);
//                 if(req.body.role == "influencer") {
//                     console.log("Creating new objects for profile")
//                     var newName = new Name();
//                     var newAddress = new Address();

//                     // const newName = new Name({
//                     //     firstName: "",
//                     //     lastName: ""
//                     // });
//                     // newName.save()
//                     //     .then(name => { 
//                     //         console.log("Created name")
//                     //         res.write("New name created successfully") 
//                     //     })
//                     //     .catch(err => { 
//                     //         console.log(err); 
//                     //         res.write("Something went wrong while creating new name") .sendStatus(400)
//                     //     })
//                     const newInfluencerProfile = new InfluencerProfile({
//                         email: req.body.email,
//                         profilePic: "",
//                         gender: "",
//                         followersCount: 0,
//                         aboutMe: "",
//                         phone: "",
//                         tasksApplied: [],
//                         ratings: [],
//                         taskCategories: [],
//                         conversations: [],
//                         name: newName,
//                         tasksCompleted: [],
//                         profileViewCount: 0,
//                         dateOfBirth: "",
//                         address: newAddress
//                     });
//                     newInfluencerProfile.save()
//                         .then(profile => {
//                             console.log("Profile Created")
//                             res.status(200).write("Profile Created").end()
//                         })
//                         .catch(err => {
//                             console.log(err)
//                             res.status(400).write(err).end()
//                         })
//                 }
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(400).send({"msg": "Something went wrong"})
//         })
// });

// @route   GET api/users/profile?email
// @desc    Get Profile
// @access  Public
router.get('/profile', requireAuth, (req, res) => {
    console.log("Inside Get Profile Request", req.query.email);
    User.findOne({ email: req.query.email })
        .then(user => {
            console.log(user.role)
            if(user.role == userRoles.INFLUENCER) {
                console.log("Getting influencer profile")
                InfluencerProfile.findOne({email:req.query.email}) 
                .then(infProfile => {
                    res.status(200).json({ message: infProfile })
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ message: "Could not fetch profile" });
                })
            } else {
                SponsorProfile.findOne({email:req.query.email}) 
                .then(sponProfile => {
                    res.status(200).json({ message: sponProfile })
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ message: "Could not fetch profile" });
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ message: "Something went wrong!" });
        })
})
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
                if (user.role == userRoles.SPONSOR) {
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
                        { returnOriginal: false, useFindAndModify: false })
                        .then(result => res.status(200).json({ success: true, message: "Sponsor Profile updated successfully!" }))
                        .catch(err => { console.log(err); res.status(400).json({ success: false, message: err }) })
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
            else { res.status(400).json({ success: false, message: "User not found" }); }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ success: false, message: err });
        })
});

// @route   PATCH api/users/profile/deactivate?email
// @desc    Deactivate User
// @access  Private
router.patch('/profile/deactivate', (req, res) => {
    console.log('Inside User Deactivate Patch Request');
    console.log(req.query.email, req.body.password);

    User.findOne({email: req.query.email})
        .then(user => {
            if (user) {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // updating isActive to false
                        User.update(
                            { email: req.query.email },
                            {
                                $set: {
                                    isActive: false
                                }
                            },
                            function(err, result) {
                                if (err) {
                                    res.status(401).json({message: 'Something went wrong'});
                                } else {
                                    res.status(200).json({message: "Deactivate Success"});
                                }
                            }
                        );
                    } else {
                        res.status(401).json({message: 'Incorrect Password'});
                    }
                });
            } else {
                res.status(404).json({message: 'User not found'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({message: 'Something went wrong'});
        })
});

module.exports = router;