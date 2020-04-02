const express = require('express');
const router = express.Router();
const passport = require('passport');

const SponsorProfile = require('../../models/SponsorProfile');
const InfluencerProfile = require('../../models/InfluencerProfile');
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
                res.status(400).json({ success: false, message: "Rating  could not be added" });
            }
            console.log(req.query.email)
            InfluencerProfile.findOneAndUpdate({
                email: req.query.email
            }, {
                $push: {
                    ratings: rating._id
                }
            }, { returnOriginal: false, useFindAndModify: false }).then(influencer => {
                console.log("Updated Influencer: ", influencer)
                if (influencer) {
                    SponsorProfile.findOneAndUpdate({
                        email: req.body.email
                    }, {
                        $push: {
                            ratings: rating._id
                        }
                    }, { returnOriginal: false, useFindAndModify: false }).then(result2 => { res.status(200).json({ success: true, message: "Rating added successfully!" }) }).catch((err2) => {
                        //delete the rating
                        Rating.findOneAndDelete({ _id: ObjectID(rating._id) });
                        InfluencerProfile.findOneAndDelete({ _id: ObjectID(influencer._id) })
                        console.log(err2); res.status(400).json({ success: false, message: err2 })
                    })
                } else {
                     //delete the rating
                    Rating.findOneAndDelete({ _id: ObjectID(rating._id) });
                    res.status(400).json({ success: false, message: "Influencer not found!" })
                }
            }).catch((err3) => {
                //delete the rating and influencer
                Rating.findOneAndDelete({ _id: ObjectID(rating._id) });
                console.log(err3); res.status(400).json({ success: false, message: err3 })
            })       
        })
            
})
    
module.exports = router;