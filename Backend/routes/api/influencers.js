const express = require('express');
const router = express.Router();
const passport = require('passport');

const SponsorProfile = require('../../models/SponsorProfile');
const InfluencerProfile = require('../../models/InfluencerProfile');
const Address = require('../../models/Address');
const Rating = require('../../models/Rating');
var ObjectID = require('mongodb').ObjectID

// @route   POST api/influencers/rate?email
// @desc    Create a task
// @access  Public
router.put('/rate', (req, res) => {
    console.log('Inside Rating Post Request');
    Rating.create({
        rating: req.body.rating,
        task: req.body.taskId, // task id
        influencer: req.query.email // user email
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
    console.log("Inside GET request to fetch all Influencer profiles by city: " + req.query.city);

    // fetch list of all address IDs with the given city
    Address.find({city: {$regex: new RegExp(req.query.city, "i")}}, {_id: 1})
        .then(addressIDObject => {
            if (addressIDObject.length == 0) {
                console.log("No such profile exists");
                res.status(404).json({message: "No such profile exists"});
            } else {
                // fetch value of address IDs from the address object
                addressIdList = []
                addressIDObject.forEach(addressId => addressIdList.push(addressId._id));

                // find Influencer Profiles who have address from any of the address IDs in the above array
                InfluencerProfile.find({address: {$in: addressIdList}})
                    .then(influencerProfiles => {
                        if (influencerProfiles.length == 0) {
                            console.log("No such profile exists");
                            res.status(404).json({message: "No such profile exists"});
                        } else {
                            res.status(200).json({message: influencerProfiles});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({message: "Something went wrong!"});
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "Something went wrong!"});
        });
});

module.exports = router;