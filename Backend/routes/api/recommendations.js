const express = require('express');
const router = express.Router();

// Task Model
const Recommendations = require('../../models/Recommendations');
const Task = require('../../models/Task');

router.get('/', (req, res) => {
    console.log('Inside Recommendations Get Request');
    Recommendations.find({
        email:req.query.email
    }).then(async (recommendation) => {
        if (recommendation && recommendation.length > 0) {
            let final_docs = await Promise.all(recommendation[0].tasks.map(async task => {
                return await fetchTaskDetails(task).then((result) => result)
            }))

            res.status(200).json({ success: true, message: final_docs })
        } else {
            res.status(400).json({ success: true, message: "No Recommendations" })
        }
    }).catch((err1) => {
        if (err1) {
            console.log(err1);
            res.status(400).json({ success: false, message: "Recommendations could not be fetched" });
        }
    })
})

let fetchTaskDetails = (task_id) => {
    return Task.findById(task_id).then(result => {
        return result;
    })
}

module.exports = router;
