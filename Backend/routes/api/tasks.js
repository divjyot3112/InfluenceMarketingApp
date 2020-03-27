const express = require('express');
const router = express.Router();
const passport = require('passport');
var  ObjectID = require('mongodb').ObjectID
// Bring in passport strategy
require('../../config/passport')(passport)

// Task Model
const Task = require('../../models/Task');
const SponsorProfile = require('../../models/SponsorProfile');
const InfluencerProfile = require('../../models/InfluencerProfile');

// @route   POST api/task/create
// @desc    Create a task
// @access  Public
router.post('/create', (req, res) => {
    console.log('Inside Task Post Request');
    Task.create({
        title: req.body.title,
        postedBy: req.body.postedBy,
        description: req.body.description,
        images: req.body.images,
        salary: req.body.salary,
        category: req.body.taskCategory,
        vacancyCount: req.body.vacancyCount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: "Created"
    }, (err1, result1) => {
        if (err1) {
            console.log(err1);
            res.status(400).json({ success: false, message: "Task could not be added" });
        }
        SponsorProfile.findOneAndUpdate({
            email: req.body.postedBy
        }, {
            $push: {
                tasksPosted: result1._id
            }
        }, { returnOriginal: false, useFindAndModify: false }).then(result => { res.status(200).json({ success: false, message: "Task added successfully" }); })
            .catch((err) => {
                //TODO: delete the task
                Task.findOneAndDelete({ _id: ObjectID(result1._id) });
                console.log(err); res.status(400).json({ success: false, message: err })
            });
    });
});

// @route   GET api/task
// @desc    Get all tasks
// @access  Public
router.get('/', (req, res) => {
    console.log('Inside Task Get Request');
    Task.find().sort({postedBy:-1}).then((tasks) => {
        res.status(200).json({ success: true, message:tasks })
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
    Task.findOne({ _id: ObjectID(req.query.taskId) /* Should be req.params.taskId */ }).then((task) => { 
        if (task) {
            if (task.appliedCandidates.length > 0) {
                var ids = task.appliedCandidates.map(function (obj){ return ObjectId(obj._id)});
                InfluencerProfile.find({ _id: { $in: ids } }).then((candidates) => {
                    res.status(200).json({ success: true, message: candidates })
                }).catch(err => {
                    console.log(err);
                    res.status(400).json({ success: false, message: "Unable to fetch candidates!" })
                })
            } else {
                res.status(400).json({ success: false, message: "No applied Candidates!" })
            }
        } else {
            res.status(400).json({ success: false, message: "Task Not Found!" })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, message: "Applied Candidates could not be fetched " })
    })
});

// @route   PUT api/task/edit/:taskId
// @desc    Edit a task for given task id
// @access  Public
router.put("/edit/:taskId", (req, res) => {
    console.log("Inside Edit Task request for Task ID:", req.params.taskId);
    Task.findOneAndUpdate(
        { _id: ObjectID(req.params.taskId) },
        {
            $set: {
                title: String,
                postedBy: req.body.postedBy, 
                postedOn: req.body.postedOn,
                description: req.body.description,
                images: req.body.images,
                status: req.body.status,
                salary: req.body.salary,
                category: req.body.category,
                appliedCandidates: req.body.appliedCandidates, 
                selectedCandidates: req.body.selectedCandidates,
                vacancyCount: req.body.vacancyCount,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            }
        },
        { returnOriginal: false, useFindAndModify: false }
    )
        .then(task => {
            console.log("Task modified successfully")
            res.status(200).json({ message: "Task modified successfully" })
        })
        .catch(err => {
            console.log("Task could not be modified")
            res.status(400).json({ message: "Task could not be modified" })
        })
})

// @route   GET api/tasks?email&&status
// @desc    Fetch all tasks by current sponsor by email and filter using task status
// @access  Public
router.get("/?email&&status", (req, res) => {
    console.log("Inside Get job by current sponsor with filter by status")
    Task.find({ postedBy: req.query.email, status: req.query.status})
        .then(tasks => {
            if(tasks) {
                reqTasks = []
                tasks.map(task => {
                        Id = task._id
                        Title = task.title
                        Images = task.images
                    reqTasks.push({
                        Id,
                        Title,
                        Images
                    })
                })
                res.status(200).json({ message: reqTasks })
            } else {
                res.status(400).json({ message: "No Tasks Found" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: "Tasks could not be fetched" })
        })
})

// @route   PUT api/tasks/:taskId/select 
// @desc    Select a candidate for a task by sponsor
// @access  Public
router.put("/:taskId/select", (req, res) => {
    Task.findOneAndUpdate(
        {_id: ObjectID(req.params.taskId)},
        {
            $set: {
                selectedCandidates: req.body.selectedCandidates
            }
        },
        {returnOriginal: false, useFindAndModify: false}
    )
        .then(task => {
            if(task.selectedCandidates.length==task.vacancyCount) {
                Task.findOneAndUpdate(
                    {_id: ObjectID(req.params.taskId)},
                    {
                        $set: {
                            status: "in progress"
                        }
                    },
                    {returnOriginal: false, useFindAndModify: false}
                )
                .catch(err => {
                    console.log(err)
                    res.status(400)
                })
            }
        })
})

module.exports = router;