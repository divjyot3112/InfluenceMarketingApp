const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in passport strategy
require('../../config/passport')(passport)

// Task Model
const Task = require('../../models/Task');

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
        category: req.body.category,
        vacancyCount: req.body.vacancyCount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: "Created"
    }, (err1, result) => {
        if (err1) {
            console.log(err1);
            res.status(400).json({ success: false, message: "Task could not be added" });
        }

        res.status(400).json({ success: false, message: "Task added successfully" });
    })
});

module.exports = router;