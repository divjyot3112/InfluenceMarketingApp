const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const path = require('path');

// Bring in passport strategy
require('../../config/passport')(passport)

// User Model
const User = require('../../models/User');

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post('/login', (req, res) => {
    console.log('Inside Login Post Request');
    console.log(req.body.email, req.body.password);
    
    User.findOne({ email: req.body.email, flag: req.body.flag })
        .then(user => {
            if(user) { 
                
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if(isMatch && !err) {
                        res.status(200).json(user); 
                    } else {
                        res.status(400).send();
                    }
                });
            }
            else { res.status(404).send(); }
        })
        .catch(err => { console.log(err); res.status(400).send()})
});

module.exports = router;