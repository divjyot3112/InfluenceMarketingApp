const express = require('express');
const router = express.Router();
const passport = require('passport');
var ObjectID = require('mongodb').ObjectID
const taskStatus = require('../../utils/Constants').TaskStatus;

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
        status: taskStatus.CREATED
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
        }, { returnOriginal: false, useFindAndModify: false }).then(result => {
            res.status(200).json({ success: false, message: "Task added successfully" });
        })
            .catch((err) => {
                //TODO: delete the task
                Task.findOneAndDelete({ _id: ObjectID(result1._id) });
                console.log(err);
                res.status(400).json({ success: false, message: err })

            })
    });
});

// @route   GET api/task
// @desc    Get all tasks
// @access  Public
router.get('/', (req, res) => {
    console.log('Inside Task Get Request');
    Task.find({ status: taskStatus.CREATED }).sort({ postedOn: -1 }).then((tasks) => {
        res.status(200).json({ success: true, message: tasks })
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
    Task.findOne({ _id: ObjectID(req.params.taskId)}).then((task) => {
        if (task) {
            if (task.appliedCandidates.length > 0) {
                InfluencerProfile.find({ _id: { $in: task.appliedCandidates } }).then((candidates) => {
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
                title: req.body.title,
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
router.get("/filter", (req, res) => {
    console.log("Inside Get tasks by current sponsor with filter by status")
    if(req.query.status=="All") {
        Task.find({ postedBy: req.query.email })
            .then(tasks => {
                if (tasks) {
                    res.status(200).json({ message: tasks })
                } else {
                    res.status(400).json({ message: "No Tasks Found" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: "Tasks could not be fetched" })
            })
    } else {
        Task.find({ postedBy: req.query.email, status: req.query.status })
            .then(tasks => {
                if (tasks) {
                    res.status(200).json({ message: tasks })
                } else {
                    res.status(400).json({ message: "No Tasks Found" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: "Tasks could not be fetched" })
            })
    }
})

// @route   PUT api/tasks/:taskId/select 
// @desc    Select a candidate for a task by sponsor
// @access  Public
router.put("/:taskId/select", (req, res) => {
    console.log("Inside select candidate request")
    Task.findOne({_id: ObjectID(req.params.taskId)})
        .then(task => {
            if(task.status == taskStatus.CREATED) {
                Task.findOneAndUpdate(
                    { _id: ObjectID(req.params.taskId) },
                    {
                        $push: {
                            selectedCandidates: req.body.selectedCandidates
                        }
                    },
                    { returnOriginal: false, useFindAndModify: false }
                )
                    .then(task => {
                        console.log("Checking if vacancy count is full"+task.vacancyCount)
                        console.log(task.selectedCandidates.length)
                        if (task.selectedCandidates.length == task.vacancyCount) {
                            Task.findOneAndUpdate(
                                { _id: ObjectID(req.params.taskId) },
                                {
                                    $set: {
                                        status: taskStatus.INPROGRESS
                                    }
                                },
                                { returnOriginal: false, useFindAndModify: false }
                            )
                                .then(task => {
                                    console.log("Status set successfully")
                                    res.status(200).json({message: "Candidates selected successfully and status of task changed"})
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(400)
                                })
                        } else {
                            res.status(200).json({message: "Candidate selected successfully"})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400)
                    })
            } else {
                res.status(400).json({message: "Candidate(s) cannot be selected at this time"})
            }
        })
        
})

// @route   PUT api/tasks/complete/:taskId
// @desc    Mark a task as complete
// @access  Public
router.put("/complete/:taskId", (req, res) => {
    console.log("Inside Mark a task as complete for Task ID:", req.params.taskId);

    Task.findOneAndUpdate(
        { _id: ObjectID(req.params.taskId) },
        {
            $set: {
                status: "Completed"
            }
        },
        { returnOriginal: false, useFindAndModify: false }
    )
        .then(task => {
            console.log("Task marked as completed successfully");
            res.status(200).json({ message: "Task marked as completed successfully" });
        })
        .catch(err => {
            console.log("Task could not be modified");
            res.status(400).json({ message: "Task could not be modified" });
        })
});

// @route   GET api/tasks/search?title
// @desc    Fetch all tasks by title
// @access  Public
router.get("/search", (req, res) => {
    console.log("Inside GET request to fetch all tasks by title: " + req.query.title);

    Task.find({ title: { $regex: new RegExp(req.query.title, "i") } })
        .then(tasks => {
            if (tasks.length != 0) {
                console.log("tasks fetched successfully for title: " + req.query.title);
                res.status(200).json({ message: tasks });
            } else {
                console.log("No tasks found");
                res.status(404).json({ message: "No tasks found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ message: "Tasks could not be fetched" });
        })
});

// @route   PUT api/tasks/:taskId/apply
// @desc    Apply for a task
// @access  Public
router.put("/:taskId/apply", (req, res) => {
    console.log("Inside Apply for a Task for Task ID:", req.params.taskId);
    console.log("Influencer who is applying for the task: " + req.body.email);

    // adding influencer's email to appliedCandidates list of the task
    Task.findOneAndUpdate(
        { _id: ObjectID(req.params.taskId) },
        {
            $addToSet: {
                appliedCandidates: req.body.email
            }
        }
    )
        .then(task => {
            // if task does not exists
            if (task == null) {
                console.log("Task does not exists");
                res.status(404).json({ message: "Task does not exists" });
            } else {
                // adding taskId to tasksApplied list of the Influencer
                InfluencerProfile.findOneAndUpdate(
                    { email: req.body.email },
                    {
                        $addToSet: {
                            tasksApplied: req.params.taskId
                        }
                    }
                )
                    .then(influencer => {
                        // if Influencer profile does not exists
                        if (influencer == null) {
                            console.log("Influencer Profile does not exists");

                            // remove Influencer email from appliedCandidates list of the task
                            Task.findOneAndUpdate(
                                { _id: ObjectID(req.params.taskId) },
                                {
                                    $pull: {
                                        appliedCandidates: req.body.email
                                    }
                                }
                            )
                                .catch(err => {
                                    console.log("Error in applying for the task");
                                    res.status(400).json({ message: "Error in applying for the task" });
                                })

                            res.status(404).json({ message: "Influencer Profile does not exists" });
                        } else {
                            console.log("Applied for task Successfully");
                            res.status(200).json({ message: "Applied for task Successfully" });
                        }
                    })
                    .catch(err => {
                        console.log("Error in applying for the task");

                        // remove Influencer email from appliedCandidates list of the task
                        Task.findOneAndUpdate(
                            { _id: ObjectID(req.params.taskId) },
                            {
                                $pull: {
                                    appliedCandidates: req.body.email
                                }
                            }
                        )
                            .catch(err => {
                                console.log("Error in applying for the task");
                                res.status(400).json({ message: "Error in applying for the task" });
                            })

                        res.status(400).json({ message: "Error in applying for the task" });
                    })
            }

        })
        .catch(err => {
            console.log("Error in applying for the task");
            res.status(400).json({ message: "Error in applying for the task" });
        })
});

module.exports = router;