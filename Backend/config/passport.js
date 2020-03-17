var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User');
var config = require('./main');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    console.log("Inside Passport")
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload.user.email)
        User.findOne({email: jwt_payload.user.email}, function(err, user) {
            if(err) {
                return done(err, false);
            }
            if(user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};