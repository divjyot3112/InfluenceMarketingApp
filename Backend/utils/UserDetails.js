const User = require("../models/User");
const InfluencerProfile = require("../models/InfluencerProfile");
const SponsorProfile = require("../models/SponsorProfile");
const userRoles = require("./Constants").UserRoles
/* For conversation Name and Image */
let fetchUserDetails = (userid) => {
    console.log(userid)
    return User.findOne({ email: userid })
        .then((user) => {
            if (user) {
                if (user.role === userRoles.SPONSOR) {
                    return SponsorProfile.findOne({ email: userid }).then((docs) => {
                        if (docs) {
                            let finaldocs = docs.toJSON()
                            finaldocs.role = user.role;
                            return finaldocs
                        } else {
                            return docs
                        }
                    }).catch((err) => {
                        console.log(err)
                        return null
                    });
                }
                else {
                    return InfluencerProfile.findOne({ email: userid }).then((docs) => {
                        if (docs) {
                            let finaldocs = docs.toJSON()
                            finaldocs.role = user.role;
                            return finaldocs
                        } else {
                            return docs
                        }
                    }).catch((err) => {
                        console.log(err)
                        return null
                    });
                }
            }
            else return null;
        })
        .catch((err) => {
            console.log(err);
            return null;
        })
}

module.exports = fetchUserDetails;