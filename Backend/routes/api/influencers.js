const express = require('express');
const router = express.Router();
const passport = require('passport');

const SponsorProfile = require('../../models/SponsorProfile');
const InfluencerProfile = require('../../models/InfluencerProfile');
const Rating = require('../../models/Rating');
var ObjectID = require('mongodb').ObjectID

// @route   POST api/influencers/rate?email
// @desc    Rate an influencer
// @access  Public
router.put('/rate', (req, res) => {
    console.log('Inside Rating Post Request');
    Rating.create({
        rating: req.body.rating,
        task: req.body.task, // task id
        influencer: req.query.email, // user email
        comment: req.body.comment,
        sponsor: req.body.sponsor
    }, (err1, rating) => {
        if (err1) {
            console.log(err1);
            res.status(400).json({success: false, message: "Rating  could not be added"});
        }
        console.log(req.query.email)
        InfluencerProfile.findOneAndUpdate({
            email: req.query.email
        }, {
            $push: {
                ratings: rating._id
            }
        }, {returnOriginal: false, useFindAndModify: false}).then(influencer => {
            console.log("Updated Influencer: ", influencer)
            if (influencer) {
                SponsorProfile.findOneAndUpdate({
                    email: req.body.email
                }, {
                    $push: {
                        ratings: rating._id
                    }
                }, {returnOriginal: false, useFindAndModify: false}).then(result2 => {
                    res.status(200).json({success: true, message: "Rating added successfully!"})
                }).catch((err2) => {
                    //delete the rating
                    Rating.findOneAndDelete({_id: ObjectID(rating._id)});
                    InfluencerProfile.findOneAndDelete({_id: ObjectID(influencer._id)})
                    console.log(err2);
                    res.status(400).json({success: false, message: err2})
                })
            } else {
                //delete the rating
                Rating.findOneAndDelete({_id: ObjectID(rating._id)});
                res.status(400).json({success: false, message: "Influencer not found!"})
            }
        }).catch((err3) => {
            //delete the rating and influencer
            Rating.findOneAndDelete({_id: ObjectID(rating._id)});
            console.log(err3);
            res.status(400).json({success: false, message: err3})
        })
    })

});

// @route   GET api/influencers/profile?city
// @desc    Fetch all Influencer profiles by city
// @access  Public
router.get("/profile", (req, res) => {
    console.log("Inside GET request to fetch all Influencer Profiles by" +
        " city: " + req.query.city);

    InfluencerProfile.find({
        "address.city": {$regex: new RegExp(req.query.city, "i")}
    })
        .then(profile => {
            if (profile.length != 0) {
                console.log("Influencer Profiles fetched successfully for " +
                    "city: " + req.query.city);
                res.status(200).json({message: profile});
            } else {
                console.log("No Influencer Profiles found");
                res.status(404).json({message: "No Influencer Profiles found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "Influencer Profiles could not be fetched"});
        })
});

// @route   GET api/influencers/ratings?email
// @desc    Fetch all Ratings for the influencer
// @access  Public
router.get("/ratings", (req, res) => {
    console.log("Inside GET request to fetch all Ratings for Influencer: " + req.query.email);

    Rating.find({
        influencer: req.query.email
    })
        .sort({ratedOn: -1})
        .then(rating => {
            if (rating.length != 0) {
                console.log("Ratings fetched successfully for influencer: " + req.query.email);
                res.status(200).json({message: rating});
            } else {
                console.log("No Ratings found for influencer: " + req.query.email);
                res.status(404).json({message: "No Ratings found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "Influencer Ratings could not be fetched"});
        })
});

module.exports = router;