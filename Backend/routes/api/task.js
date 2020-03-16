const express = require('express');
const router = express.Router();
const passport = require('passport');
var  ObjectID = require('mongodb').ObjectID
// Bring in passport strategy
require('../../config/passport')(passport)

// Task Model
const Task = require('../../models/Task');
const SponsorProfile = require('../../models/SponsorProfile');

// @route   POST api/task/create
// @desc    Create a task
// @access  Public
router.post('/create', (req, res) => {
    console.log('Inside Task Post Request');
    var taskCategory = {}
    if (req.body && req.body.taskCategory && req.body.taskCategory._id && req.body.taskCategory.description) {
        taskCategory = {_id: ObjectID(req.body.taskCategory._id),description: req.body.taskCategory.description}
    }
    Task.create({
        title: req.body.title,
        postedBy: req.body.postedBy,
        description: req.body.description,
        images: req.body.images,
        salary: req.body.salary,
        category: taskCategory,
        vacancyCount: req.body.vacancyCount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: "Created"
    }, (err1, result) => {
        if (err1) {
            console.log(err1);
            res.status(400).json({ success: true, message: "Task could not be added" });
        }
        SponsorProfile.findOneAndUpdate({
            email: req.body.postedBy
        }, {
            $push: {
                tasksPosted: result
            }
        }, { returnOriginal: false, useFindAndModify: false }).then(result => { res.status(200).json({ success: true, message: "Task linked to sponsor successfully!" })})
            .catch((err) => { console.log(err); res.status(400).json({ success: false, message: err }) })
        res.status(400).json({ success: false, message: "Task added successfully" });
    })
});

// @route   GET api/task
// @desc    Get all tasks
// @access  Public
router.get('/', (req, res) => {
    console.log('Inside Task Get Request');
    Task.find().sort({postedBy:-1}).then((tasks) => {
        res.status(400).json({ success: true, message:tasks })
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, message: "Tasks could not be fetched!" })
    })
});

// @route   GET api/task/:taskId/applicants
// @desc    Get all applicants of a task
// @access  Public
router.get('/:taskId/applicants', (req, res) => {
    console.log('Inside Task Get applicants  Request');
    Task.findOne({ _id: ObjectID(req.query.taskId) }).then((task) => {
        if (task) {
            res.status(400).json({ success: true, message: task.appliedCandidates })
        } else {
            res.status(400).json({ success: false, message: "Task Not Found!" })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, message: "Applied Candidates could not be fetched " })
    })
});


module.exports = router;