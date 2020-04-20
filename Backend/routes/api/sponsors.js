const express = require('express');
const router = express.Router();
const passport = require('passport');

const SponsorProfile = require('../../models/SponsorProfile');
const Rating = require('../../models/Rating');
var ObjectID = require('mongodb').ObjectID

// @route   GET api/sponsors/ratings?email
// @desc    Fetch all Ratings given by the sponsor
// @access  Public
router.get("/ratings", (req, res) => {
    console.log("Inside GET request to fetch all Ratings given by Sponsor: " + req.query.email);

    Rating.find({
        sponsor: req.query.email
    })
        .sort({ratedOn: -1})
        .then(rating => {
            if (rating.length != 0) {
                console.log("Ratings fetched successfully for sponsor: " + req.query.email);
                res.status(200).json({message: rating});
            } else {
                console.log("No Ratings found for sponsor: " + req.query.email);
                res.status(404).json({message: "No Ratings found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: "Sponsor Ratings could not be fetched"});
        })
});

module.exports = router;