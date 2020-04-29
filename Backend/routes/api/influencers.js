const express = require("express");
const router = express.Router();
const passport = require("passport");

const SponsorProfile = require("../../models/SponsorProfile");
const InfluencerProfile = require("../../models/InfluencerProfile");
const Rating = require("../../models/Rating");
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
          .json({ success: false, message: "Rating  could not be added" });
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
        { returnOriginal: false, useFindAndModify: false }
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
              { returnOriginal: false, useFindAndModify: false }
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
                Rating.findOneAndDelete({ _id: ObjectID(rating._id) });
                InfluencerProfile.findOneAndDelete({
                  _id: ObjectID(influencer._id),
                });
                console.log(err2);
                res.status(400).json({ success: false, message: err2 });
              });
          } else {
            //delete the rating
            Rating.findOneAndDelete({ _id: ObjectID(rating._id) });
            console.log("Influencer does not exist");
            res
              .status(404)
              .json({ success: false, message: "Influencer does not exist" });
          }
        })
        .catch((err3) => {
          //delete the rating and influencer
          Rating.findOneAndDelete({ _id: ObjectID(rating._id) });
          console.log(err3);
          res.status(400).json({ success: false, message: err3 });
        });
    }
  );
});

// @route   GET api/influencers/profile?address&firstName&lastName
// @desc    Fetch all Influencer profiles by address
// @access  Public
router.get("/profile", (req, res) => {
  var ratingsMap = {};
  console.log(
    "Inside GET request to fetch all Influencer Profiles by" +
      " address: " +
      req.query.address
  );

  InfluencerProfile.find({
    address: { $regex: new RegExp(req.query.address, "i") },
    $or: [
      { "name.firstName": { $regex: new RegExp(req.query.firstName, "i") } },
      { "name.lastName": { $regex: new RegExp(req.query.lastName, "i") } },
    ],
  })
    .then((profiles) => {
      if (profiles.length > 0) {
        console.log(
          "Profiles searched successfully for name " +
            "First name: " +
            req.query.firstName +
            " and Last name" +
            req.query.lastName +
            " Getting Ratings:"
        );

        profiles.map((profile, profileIndex) =>
          Rating.find({
            influencer: profile.email,
          })
            .sort({ ratedOn: -1 })
            .then((r) => {
              if (r.length != 0) {
                console.log(
                  "Ratings fetched successfully for influencer: " +
                    profile.email
                );
                // console.log(r[0])
                const email = profile.email;
                console.log(profile.email);
                let avgRating = 0;
                r.map((x) => {
                  avgRating += x.rating / r.length;
                });
                console.log(avgRating);
                ratingsMap[email] = JSON.stringify(avgRating);
                console.log(ratingsMap);
              } else {
                console.log(
                  "No Ratings found for influencer: " + profile.email
                );
                ratingsMap[profile.email] = null;
                // res.status(404).json({message: "No Ratings found"});
              }
              if (profileIndex === profiles.length - 1) {
                // console.log("Ratings Map" + ratingsMap)
                res
                  .status(200)
                  .json({ message: profiles, ratings: ratingsMap });
              }
            })
            .catch((err) => {
              console.log(err);
            })
        );
      } else {
        console.log("No  Profiles found");
        res
          .status(404)
          .json({ message: "No Profile with matching name found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "Influencer Profiles could not be fetched" });
    });
});

// @route   GET api/influencers/ratings?email
// @desc    Fetch all Ratings for the influencer
// @access  Public
router.get("/ratings", (req, res) => {
  console.log(
    "Inside GET request to fetch all Ratings for Influencer: " + req.query.email
  );

  Rating.find({
    influencer: req.query.email,
  })
    .sort({ ratedOn: -1 })
    .then((rating) => {
      if (rating.length != 0) {
        console.log(
          "Ratings fetched successfully for influencer: " + req.query.email
        );
        res.status(200).json({ message: rating });
      } else {
        console.log("No Ratings found for influencer: " + req.query.email);
        res.status(404).json({ message: "No Ratings found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "Influencer Ratings could not be fetched" });
    });
});

//arman
// @route   GET api/profile/firstName&&LastName
// @desc    Search user profiles by name
// @access  Public

//check email not equal to current email
router.get("/searchProfile", (req, res) => {
  console.log("Inside search profile by name API");
  console.log(
    "Inside search profile by name API" +
      req.query.firstName +
      req.query.lastName
  );

  let conditions;
  let ratingsMap = {};

  if (req.query.firstName && req.query.lastName == null) {
    conditions = {
      // match firstname
      "name.firstName": { $regex: new RegExp(req.query.firstName, "i") },
    };
  } else if (req.query.lastName && req.query.firstName == null) {
    //match lastname

    conditions = {
      "name.lastName": { $regex: new RegExp(req.query.lastName, "i") },
    };
  } else {
    //match entire name
    conditions = {
      $and: [
        {
          "name.firstName": { $regex: new RegExp(req.query.firstName, "i") },
        },
        { "name.lastName": { $regex: new RegExp(req.query.lastName, "i") } },
      ],
    };
  }

  InfluencerProfile.find(conditions)
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
            .sort({ ratedOn: -1 })
            .then((r) => {
              if (r.length != 0) {
                console.log(
                  "Ratings fetched successfully for influencer: " +
                    profile.email
                );
                // console.log(r[0])
                const email = profile.email;
                console.log(profile.email);
                let avgRating = 0;
                r.map((x) => {
                  avgRating += x.rating / r.length;
                });
                console.log(avgRating);
                ratingsMap[email] = JSON.stringify(avgRating);
                console.log(ratingsMap);
              } else {
                console.log(
                  "No Ratings found for influencer: " + profile.email
                );
                ratingsMap[profile.email] = null;
                // res.status(404).json({message: "No Ratings found"});
              }
              if (profileIndex === profiles.length - 1) {
                // console.log("Ratings Map" + ratingsMap)
                res
                  .status(200)
                  .json({ message: profiles, ratings: ratingsMap });
              }
            })
            .catch((err) => {
              console.log(err);
            })
        );
      } else {
        console.log("No  Profiles found");
        res
          .status(404)
          .json({ message: "No Profile with matching name found" });
      }
    })

    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "Server Error fetching profiles: " + err });
    });
});

module.exports = router;
