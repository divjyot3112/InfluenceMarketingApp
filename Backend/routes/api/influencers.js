const express = require("express");
const router = express.Router();
const passport = require("passport");

const SponsorProfile = require("../../models/SponsorProfile");
const InfluencerProfile = require("../../models/InfluencerProfile");
const Rating = require("../../models/Rating");
const taskStatus = require("../../utils/Constants").TaskStatus;
var ObjectID = require("mongodb").ObjectID;

// @route   POST api/influencers/rate?email
// @desc    Rate an influencer
// @access  Public
router.put("/rate", (req, res) => {
    console.log("Inside Rating Post Request");
    Rating.create(
        {
            rating: req.body.rating,
            task: req.body.task, // task id
            influencer: req.query.email, // user email
            comment: req.body.comment,
            sponsor: req.body.sponsor,
        },
        (err1, rating) => {
            if (err1) {
                console.log(err1);
                res
                    .status(400)
                    .json({success: false, message: "Rating  could not be added"});
            }

            InfluencerProfile.findOneAndUpdate(
                {
                    email: req.query.email,
                },
                {
                    $push: {
                        ratings: rating._id,
                    },
                },
                {returnOriginal: false, useFindAndModify: false}
            )
                .then((influencer) => {
                    console.log("Updated Influencer: ", influencer);
                    if (influencer) {
                        SponsorProfile.findOneAndUpdate(
                            {
                                email: req.body.email,
                            },
                            {
                                $push: {
                                    ratings: rating._id,
                                },
                            },
                            {returnOriginal: false, useFindAndModify: false}
                        )
                            .then((result2) => {
                                console.log("Rating added successfully");
                                res
                                    .status(200)
                                    .json({
                                        success: true,
                                        message: "Rating added successfully",
                                    });
                            })
                            .catch((err2) => {
                                //delete the rating
                                Rating.findOneAndDelete({_id: ObjectID(rating._id)});
                                InfluencerProfile.findOneAndDelete({
                                    _id: ObjectID(influencer._id),
                                });
                                console.log(err2);
                                res.status(400).json({success: false, message: err2});
                            });
                    } else {
                        //delete the rating
                        Rating.findOneAndDelete({_id: ObjectID(rating._id)});
                        console.log("Influencer does not exist");
                        res
                            .status(404)
                            .json({success: false, message: "Influencer does not exist"});
                    }
                })
                .catch((err3) => {
                    //delete the rating and influencer
                    Rating.findOneAndDelete({_id: ObjectID(rating._id)});
                    console.log(err3);
                    res.status(400).json({success: false, message: err3});
                });
        }
    );
});

// @route   GET api/influencers/ratings?email
// @desc    Fetch all Ratings for the influencer
// @access  Public
router.get("/ratings", (req, res) => {
    console.log("Inside GET request to fetch all Ratings for Influencer: " + req.query.email);

    Rating.find({
        influencer: req.query.email,
    })
        .sort({ratedOn: -1})
        .then((rating) => {
            if (rating.length != 0) {
                console.log("Ratings fetched successfully for influencer: " + req.query.email);
                res.status(200).json({message: rating});
            } else {
                console.log("No Ratings found for influencer: " + req.query.email);
                res.status(404).json({message: "No Ratings found"});
            }
        })
        .catch((err) => {
            console.log(err);
            res
                .status(400)
                .json({message: "Influencer Ratings could not be fetched"});
        });
});

// @route   GET api/influencers/profile/firstName&&lastName&&email
// @desc    Search influencer profiles by name
// @access  Public
router.get("/profile", (req, res) => {
    console.log("Inside search influencer profile by name GET request");
    console.log(
        req.query.firstName +
        req.query.lastName
    );

    let conditions;
    let ratingsMap = {};

    if (req.query.firstName && req.query.lastName == null) {
        conditions = {
            // match firstname
            "name.firstName": {$regex: new RegExp(req.query.firstName, "i")},
        };
    } else if (req.query.lastName && req.query.firstName == null) {
        //match lastname
        conditions = {
            "name.lastName": {$regex: new RegExp(req.query.lastName, "i")},
        };
    } else {
        //match entire name
        conditions = {
            $and: [
                {
                    "name.firstName": {$regex: new RegExp(req.query.firstName, "i")},
                },
                {"name.lastName": {$regex: new RegExp(req.query.lastName, "i")}},
            ],
        };
    }

    InfluencerProfile.find({
        $and:
            [
                {email: {$ne: req.query.email}},
                conditions
            ]
    })
        .then((profiles) => {
            if (profiles && profiles.length > 0) {
                console.log(
                    "Profiles searched successfully for name " +
                    "First name: " +
                    req.query.firstName +
                    " and Last name" +
                    req.query.lastName
                );
                profiles.map((profile, profileIndex) =>
                    Rating.find({
                        influencer: profile.email,
                    })
                        .sort({ratedOn: -1})
                        .then((rating) => {
                            if (rating.length != 0) {
                                console.log(
                                    "Ratings fetched successfully for influencer: " +
                                    profile.email
                                );

                                const email = profile.email;
                                let avgRating = 0;
                                rating.map((x) => {
                                    avgRating += x.rating / rating.length;
                                });
                                ratingsMap[email] = JSON.stringify(avgRating);

                            } else {
                                console.log(
                                    "No Ratings found for influencer: " + profile.email
                                );
                                ratingsMap[profile.email] = null;
                            }
                            if (profileIndex === profiles.length - 1) {
                                res
                                    .status(200)
                                    .json({message: profiles, ratings: ratingsMap});
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                );
            } else {
                console.log("No Matching Profiles found");
                res
                    .status(200)
                    .json({message: profiles});
            }
        })
        .catch((err) => {
            console.log(err);
            res
                .status(400)
                .json({message: "Server Error fetching influencer profiles: " + err});
        });
});

/////////////////////////////////////////////////////////////////////////////////////

// ANALYTICS

// @route   GET api/influencers/ratings/category?email=emailID
// @desc    GET AVERAGE RATINGS BY CATEGORY
// @access  Public
router.get("/ratings/category", (req, res) => {
    console.log("Inside get avg ratings by category request for " + req.query.email)
    var ratingsMap = {}
    var totalRatings = {}
    Rating.find({influencer:req.query.email})
        .then(ratings => {
            if(ratings.length>0) {
                console.log(ratings.length + " ratings found")
                ratings.map((rating, index) => {
                    Task.findOne({_id:ObjectID(rating.task)})
                        .then(task => {
                            if(task) {
                                // const constructMap = () => {
                                    ratingsMap[task.category] = ratingsMap[task.category] ? 
                                        ratingsMap[task.category] + rating.rating :
                                        rating.rating;
                                    totalRatings[task.category] = totalRatings[task.category] ?
                                        totalRatings[task.category]+1 : 1;
                                // }
                                const calcAvg = () => {
                                    if(index === ratings.length-1) {
                                        setTimeout(() => {
                                            for(var key of Object.keys(ratingsMap)) {
                                                console.log("Inside for " + ratingsMap[key] + " " + totalRatings[key])
                                                ratingsMap[key] = ratingsMap[key] / totalRatings[key]
                                            }
                                            console.log(ratingsMap)
                                            res.status(200).json({message: ratingsMap})
                                        }, 10)
                                    }
                                }
                                calcAvg()
                            } else {
                                console.log("Task Not found")
                            }
                        })
                        .catch(err => {
                            // res.status(400).json({message:"Task not found"})
                            console.log(err)
                        })
                })
            } else {
                res.status(404).json({message: "No ratings for this user"})
            }
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
})

// @route   GET api/influencers/selected/category?email=emailID
// @desc    GET SELECTED TASK COUNT BY CATEGORY
// @access  Public
router.get("/selected/category", (req, res) => {
    var result = {}
    Task.find({selectedCandidates: req.query.email})
        .then(tasks => {
            console.log(tasks.length)
            if(tasks) {
                tasks.forEach((task, index) => {
                    result[task.category] = result[task.category] ? result[task.category] + 1 : 1
                    if(index===tasks.length-1) {
                        res.status(200).json({message: result})
                    }
                })
            } else {
                console.log("Tasks not found")
            }
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
});

// @route   GET api/influencers/earnings/category?email=emailID
// @desc    GET SELECTED TOTAL EARNINGS BY CATEGORY
// @access  Public
router.get("/earnings/category", (req, res) => {
    var result = {}
    Task.find({selectedCandidates: req.query.email})
        .then(tasks => {
            console.log(tasks.length)
            if(tasks) {
                tasks.forEach((task, index) => {
                    if(task.status===taskStatus.COMPLETED){
                        console.log(task._id)
                        result[task.category] = result[task.category] ? 
                            result[task.category] + task.salary : 
                            task.salary
                    }
                    if(index===tasks.length-1) {
                        res.status(200).json({message: result})
                    }
                })
            } else {
                console.log("Tasks not found")
            }
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
});

module.exports = router;
