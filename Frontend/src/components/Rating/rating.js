import React, {Component} from 'react'
import InfluencerRating from './influencerRating'
import SponsorRating from './sponsorRating'
import {UserRoles} from '../../utils/Constants'
import {getRoleFromLocalStorage} from "../Common/auth";

class Rating extends Component {
    render() {
        const role = getRoleFromLocalStorage();
        let rating = (role === UserRoles.INFLUENCER) ? <InfluencerRating></InfluencerRating> :
            <SponsorRating></SponsorRating>
        return rating
    }
}

export default Rating;