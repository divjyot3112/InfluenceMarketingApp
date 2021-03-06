const express = require("express");
const router = express.Router();
const multer = require("multer");
var config = require("../../config/main");
const passport = require("passport");
const path = require("path");
const jwt = require("jsonwebtoken");
const userRoles = require("../../utils/Constants").UserRoles;
const taskStatus = require("../../utils/Constants").TaskStatus;
// Set up passport middleware
var requireAuth = passport.authenticate("jwt", {session: false});

// Bring in passport strategy
require("../../config/passport")(passport);

// Import models
const User = require("../../models/User");
const InfluencerProfile = require("../../models/InfluencerProfile");
const SponsorProfile = require("../../models/SponsorProfile");
const Rating = require("../../models/Rating");

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post("/login", (req, res) => {
    console.log("Inside Login POST Request");
    console.log(req.body.email, req.body.password);

    User.findOne({email: req.body.email})
        .then((user) => {
            // check if user exists
            if (user) {

                // reactivate account if it was deactivated
                if (user.isActive == false) {
                    User.update(
                        {email: req.body.email},
                        {
                            $set: {
                                isActive: true,
                            },
                        },
                        function (err, result) {
                            if (err) {
                                console.log("Cannot reactivate account");
                                res.status(400).json({message: "Something went wrong"});
                            } else {
                                console.log("Account reactivated")
                            }

                        })
                }

                // if account gets activated or was already active
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // Creating token if password is a match and no errors
                        var token = jwt.sign({user}, config.secret, {
                            expiresIn: 10080, // In seconds
                        });
                        console.log("Login Successful");
                        res.status(200).json({
                            message: "Login Successful",
                            token: "Bearer " + token,
                        });
                    } else {
                        console.log("Password is incorrect");
                        res.status(200).json({message: "Password is incorrect"});
                    }
                });
            } else {
                console.log("User does not exist");
                res.status(200).json({message: user});
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({message: "Something went wrong"});
        });
});

// @route   GET api/users/profile?email
// @desc    Get Profile
// @access  Public
router.get("/profile", (req, res) => {
    console.log("Inside GET Profile Request", req.query.email);

    User.findOne({email: req.query.email, isActive: true})
        .then((user) => {
            // check if user exists
            if (user) {
                console.log("User Role: " + user.role)
                if (user.role == userRoles.INFLUENCER) {
                    console.log("Getting influencer profile");
                    InfluencerProfile.findOne({email: req.query.email})
                        .then((influencerProfile) => {
                            res
                                .status(200)
                                .json({
                                    message: influencerProfile,
                                    role: userRoles.INFLUENCER,
                                });
                        })
                        .catch((err) => {
                            console.log("Something went wrong");
                            res.status(400).json({message: "Something went wrong"});
                        });
                } else {
                    // user is sponsor
                    console.log("Fetching Sponsor profile")
                    SponsorProfile.findOne({email: req.query.email})
                        .then((sponsorProfile) => {
                            console.log("Profile found successfully")
                            res
                                .status(200)
                                .json({message: sponsorProfile, role: userRoles.SPONSOR});
                        })
                        .catch((err) => {
                            console.log("Something went wrong");
                            res.status(400).json({message: "Something went wrong"});
                        });
                }
            } else {
                console.log("User does not exist");
                res.status(404).json({message: "User does not exist"});
            }
        })
        .catch((err) => {
            console.log("Something went wrong");
            res.status(400).json({message: "Something went wrong"});
        });
});

// @route   PUT api/users/profile?email
// @desc    User profile update
// @access  Public
router.put("/profile", (req, res) => {
    console.log("Inside Update Profile PUT request");
    console.log("Profile to be updated: ", req.query.email);

    User.findOne({email: req.query.email, isActive: true})
        .then((user) => {
            // check if user exists
            if (user) {
                if (user.role == userRoles.SPONSOR) {
                    SponsorProfile.findOneAndUpdate(
                        {email: req.query.email},
                        {
                            $set: {
                                name: req.body.name,
                                company: req.body.company,
                                image: req.body.image,
                                phone: req.body.phone,
                                address: req.body.address,
                                aboutMe: req.body.aboutMe,
                                gender: req.body.gender,
                                dateOfBirth: req.body.dateOfBirth,
                            },
                        },
                        {returnOriginal: false, useFindAndModify: false}
                    )
                        .then((result) =>
                            res.status(200).json({
                                success: true,
                                message: "Sponsor Profile updated successfully",
                            })
                        )
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({success: false, message: err});
                        });
                } else {
                    // user is influencer
                    InfluencerProfile.findOneAndUpdate(
                        {email: req.query.email},
                        {
                            $set: {
                                name: req.body.name,
                                taskCategories: req.body.taskCategories,
                                image: req.body.image,
                                phone: req.body.phone,
                                address: req.body.address,
                                aboutMe: req.body.aboutMe,
                                gender: req.body.gender,
                                dateOfBirth: req.body.dateOfBirth,
                                followersCount: req.body.followersCount,
                            },
                        },
                        {returnOriginal: false, useFindAndModify: false}
                    )
                        .then((result) =>
                            res.status(200).json({
                                success: true,
                                message: "Influencer Profile updated successfully",
                            })
                        )
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({success: false, message: err});
                        });
                }
            } else {
                console.log("User does not exist");
                res
                    .status(404)
                    .json({success: false, message: "User does not exist"});
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({success: false, message: err});
        });
});

// @route   PATCH api/users/profile/deactivate?email
// @desc    Deactivate User
// @access  Private
router.patch("/profile/deactivate", (req, res) => {
    console.log("Inside User Deactivate Patch Request");
    console.log(req.query.email, req.body.password);

    User.findOne({email: req.query.email, isActive: true})
        .then((user) => {
            // check if user exists
            if (user) {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    //check if password matches
                    if (isMatch && !err) {
                        // check if user is influencer
                        if (user.role == userRoles.INFLUENCER) {
                            // if user is in selectedCandidate of any active task and status is
                            // Created, Pending, InProgress then cannot deactivate
                            Task.find({
                                $and: [
                                    {isActive: true},
                                    {
                                        selectedCandidates: {
                                            $elemMatch: {$eq: req.query.email},
                                        },
                                    },
                                    {
                                        $or: [
                                            {status: taskStatus.CREATED},
                                            {status: taskStatus.PENDING},
                                            {status: taskStatus.INPROGRESS},
                                        ],
                                    },
                                ],
                            })
                                .then((tasks) => {
                                    if (tasks.length > 0) {
                                        console.log("Cannot Deactivate Account");
                                        res
                                            .status(401)
                                            .json({message: "Cannot Deactivate Account"});
                                    } else {
                                        // 1. set isActive to false
                                        User.update(
                                            {email: req.query.email},
                                            {
                                                $set: {
                                                    isActive: false,
                                                },
                                            },
                                            function (err, result) {
                                                if (err) {
                                                    console.log("Something went wrong");
                                                    res
                                                        .status(400)
                                                        .json({message: "Something went wrong"});
                                                } else {
                                                    // 2. remove all tasks from appliedTasks in influencer for which status is:
                                                    // Created, Pending or In Progress
                                                    Task.find({
                                                        $and: [
                                                            {isActive: true},
                                                            {
                                                                appliedCandidates: {
                                                                    $elemMatch: {$eq: req.query.email},
                                                                },
                                                            },
                                                            {
                                                                $or: [
                                                                    {status: taskStatus.CREATED},
                                                                    {status: taskStatus.PENDING},
                                                                    {status: taskStatus.INPROGRESS},
                                                                ],
                                                            },
                                                        ],
                                                    })
                                                        .then((tasks) => {
                                                            if (tasks.length > 0) {
                                                                // get all taskIds in an array
                                                                var taskIds = [];
                                                                for (var i = 0; i < tasks.length; i++) {
                                                                    taskIds.push(tasks[i]._id);
                                                                }

                                                                InfluencerProfile.update(
                                                                    {email: req.query.email},
                                                                    {
                                                                        $pull: {
                                                                            tasksApplied: {$in: taskIds},
                                                                        },
                                                                    },
                                                                    function (err, result) {
                                                                        if (err) {
                                                                            // make user active again
                                                                            User.update(
                                                                                {email: req.query.email},
                                                                                {
                                                                                    $set: {
                                                                                        isActive: true,
                                                                                    },
                                                                                }
                                                                            );
                                                                            console.log("Something went wrong");
                                                                            res
                                                                                .status(400)
                                                                                .json({
                                                                                    message: "Something went wrong",
                                                                                });
                                                                        } else {
                                                                            // 3. remove email from appliedCandidates of task where status is Created, Pending, InProgress
                                                                            Task.updateMany(
                                                                                {
                                                                                    $and: [
                                                                                        {isActive: true},
                                                                                        {
                                                                                            appliedCandidates: {
                                                                                                $elemMatch: {
                                                                                                    $eq: req.query.email,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                        {
                                                                                            $or: [
                                                                                                {status: taskStatus.CREATED},
                                                                                                {status: taskStatus.PENDING},
                                                                                                {
                                                                                                    status: taskStatus.INPROGRESS,
                                                                                                },
                                                                                            ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    $pull: {
                                                                                        appliedCandidates: req.query.email,
                                                                                    },
                                                                                },
                                                                                function (err, result) {
                                                                                    if (err) {
                                                                                        // make user active again
                                                                                        User.update(
                                                                                            {email: req.query.email},
                                                                                            {
                                                                                                $set: {
                                                                                                    isActive: true,
                                                                                                },
                                                                                            }
                                                                                        );
                                                                                        // add taskIds to influencer's tasksApplied again
                                                                                        InfluencerProfile.update(
                                                                                            {email: req.query.email},
                                                                                            {
                                                                                                $push: {
                                                                                                    tasksApplied: {
                                                                                                        $in: taskIds,
                                                                                                    },
                                                                                                },
                                                                                            }
                                                                                        );
                                                                                        console.log("Something went wrong");
                                                                                        res
                                                                                            .status(400)
                                                                                            .json({
                                                                                                message: "Something went wrong",
                                                                                            });
                                                                                    } else {
                                                                                        console.log(
                                                                                            "Account Deactivated successfully"
                                                                                        );
                                                                                        res
                                                                                            .status(200)
                                                                                            .json({
                                                                                                message:
                                                                                                    "Account Deactivated successfully",
                                                                                            });
                                                                                    }
                                                                                }
                                                                            );
                                                                        }
                                                                    }
                                                                );
                                                            } else {
                                                                console.log("Account Deactivated successfully");
                                                                res
                                                                    .status(200)
                                                                    .json({
                                                                        message: "Account Deactivated successfully",
                                                                    });
                                                            }
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                            res.status(400).json({message: err});
                                                        });
                                                }
                                            }
                                        );
                                    }
                                })
                                .catch((err) => {
                                    console.log("Something went wrong");
                                    res.status(400).json({message: "Something went wrong"});
                                });
                        } else {
                            // user is a sponsor
                            // if any influencer is present in selectedCandidates, task is posted by sponsor and status is
                            // Created, Pending, InProgress then cannot deactivate
                            Task.find({
                                $and: [
                                    {isActive: true},
                                    {postedBy: req.query.email},
                                    {selectedCandidates: {$exists: true, $not: {$size: 0}}},
                                    {
                                        $or: [
                                            {status: taskStatus.CREATED},
                                            {status: taskStatus.PENDING},
                                            {status: taskStatus.INPROGRESS},
                                        ],
                                    },
                                ],
                            })
                                .then((tasks) => {
                                    if (tasks.length > 0) {
                                        console.log("Cannot Deactivate Account");
                                        res
                                            .status(401)
                                            .json({message: "Cannot Deactivate Account"});
                                    } else {
                                        // set isActive to false
                                        User.update(
                                            {email: req.query.email},
                                            {
                                                $set: {
                                                    isActive: false,
                                                },
                                            },
                                            function (err, result) {
                                                if (err) {
                                                    console.log("Something went wrong");
                                                    res
                                                        .status(400)
                                                        .json({message: "Something went wrong"});
                                                } else {
                                                    // mark as cancelled - all tasks which are created and has no selected candidates
                                                    Task.updateMany(
                                                        {
                                                            isActive: true,
                                                            postedBy: req.query.email,
                                                            status: taskStatus.CREATED,
                                                            selectedCandidates: {$size: 0},
                                                        },
                                                        {
                                                            $set: {
                                                                status: taskStatus.CANCELLED,
                                                                isActive: false,
                                                            },
                                                        },
                                                        function (err, result) {
                                                            if (err) {
                                                                console.log("Something went wrong");
                                                                User.update(
                                                                    {email: req.query.email},
                                                                    {
                                                                        $set: {
                                                                            isActive: true,
                                                                        },
                                                                    }
                                                                );
                                                                res
                                                                    .status(400)
                                                                    .json({message: "Something went wrong"});
                                                            } else {
                                                                console.log("Account Deactivated successfully");
                                                                res
                                                                    .status(200)
                                                                    .json({
                                                                        message: "Account Deactivated successfully",
                                                                    });
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                })
                                .catch((err) => {
                                    console.log("Something went wrong");
                                    res.status(400).json({message: "Something went wrong"});
                                });
                        }
                    } else {
                        console.log("Incorrect Password");
                        res.status(402).json({message: "Incorrect Password"});
                    }
                });
            } else {
                console.log("User does not exist");
                res.status(404).json({message: "User does not exist"});
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({message: "Something went wrong"});
        });
});

// @route   POST api/users/signup
// @desc    Sign Up a new user
// @access  Public
router.post("/signup", (req, res) => {
    console.log("Inside signup POST request", req.body);

    User.findOne({email: req.body.email})
        .then((user) => {
            //check if user exists
            if (user) {
                console.log("User already exists");
                res.status(200).json({message: "User already exists"});
            } else {
                // else create new user
                console.log("Creating new user");
                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    isActive: true,
                });
                //save the user details
                newUser
                    .save()
                    .then((user) => {
                        let newProfile;

                        //check role to create appropriate profile
                        if (req.body.role == userRoles.INFLUENCER) {
                            newProfile = new InfluencerProfile({
                                name: req.body.name,
                                image: req.body.image,
                                phone: req.body.phone,
                                email: req.body.email,
                                followersCount: req.body.followersCount
                            });
                        } else {
                            newProfile = new SponsorProfile({
                                name: req.body.name,
                                image: req.body.image,
                                phone: req.body.phone,
                                email: req.body.email,
                                company: req.body.company
                            });
                        }

                        newProfile
                            .save()
                            .then((profile) => {
                                console.log("User created", profile);
                                res.status(200).json({message: {profile, user}});
                            })
                            .catch((err) => {
                                res.status(401).json({
                                    message: "Something went wrong while creating user profile",
                                });
                            });
                    })
                    .catch((err) => {
                        res
                            .status(401)
                            .json({message: "Something went wrong while creating user"});
                    });
            }
        })
        .catch((err) => {
            console.log("Something went wrong");
            res.status(500).json({error: err});
        });
});

module.exports = router;