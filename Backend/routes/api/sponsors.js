const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require("../../models/Task");
const SponsorProfile = require('../../models/SponsorProfile');
const Rating = require('../../models/Rating');
const taskStatus = require("../../utils/Constants").TaskStatus;
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


//////////////////////////////////////////////////////////////////////////////////

// ANALYTICS

// @route   GET api/sponsors/payment/category?email=emailID
// @desc    GET AVERAGE PAYMENT BY CATEGORY
// @access  Public
router.get("/tasks/category", (req, res) => {
    var result = {}
    Task.find({postedBy: req.query.email})
        .then(tasks => {
            console.log(tasks.length)
            if(tasks) {
                tasks.forEach((task, index) => {
                    console.log(task._id)
                    result[task.category] = result[task.category] ? 
                        result[task.category] + 1 : 
                        1;
                    if(index===tasks.length-1) {
                        res.status(200).json({message: result})
                    }
                })
            } else {
                console.log("Tasks not found")
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({message: err})
        })
});

// @route   GET api/sponsors/payment/category?email=emailID
// @desc    GET AVERAGE PAYMENT BY CATEGORY
// @access  Public
router.get("/payment/category", (req, res) => {
    var result = {}
    var tasksCompletePerCategory = {}
    Task.find({postedBy: req.query.email})
        .then(tasks => {
            if(tasks) {
                tasks.forEach((task, index) => {
                    if(task.status && task.status===taskStatus.COMPLETED) {
                        console.log(task._id)
                        result[task.category] = result[task.category] ? 
                            result[task.category] + task.salary : 
                            task.salary;
                        tasksCompletePerCategory[task.category] = tasksCompletePerCategory[task.category] ?
                            tasksCompletePerCategory[task.category] + 1 : 1;
                    }
                    if(index===tasks.length-1) {
                        for(var key of Object.keys(result)) {
                            console.log("Inside for " + result[key] + " " + tasksCompletePerCategory[key])
                            result[key] = result[key] / tasksCompletePerCategory[key]
                        }
                        res.status(200).json({message: result})
                    }
                })
            } else {
                console.log("Tasks not found")
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({message: err})
        })
});

// @route   GET api/sponsors/completed/category?email=emailID
// @desc    GET AVERAGE PAYMENT BY CATEGORY
// @access  Public
router.get("/completed/category", (req, res) => {
    var tasksCompletePerCategory = {}
    Task.find({postedBy: req.query.email})
        .then(tasks => {
            if(tasks) {
                tasks.forEach((task, index) => {
                    if(task.status && task.status===taskStatus.COMPLETED) {
                        console.log(task._id)
                        tasksCompletePerCategory[task.category] = tasksCompletePerCategory[task.category] ?
                            tasksCompletePerCategory[task.category] + 1 : 1;
                    }
                    if(index===tasks.length-1) {
                        res.status(200).json({message: tasksCompletePerCategory})
                    }
                })
            } else {
                console.log("Tasks not found")
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({message: err})
        })
});

module.exports = router;