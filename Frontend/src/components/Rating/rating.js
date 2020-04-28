import React, {Component} from 'react'
import InfluencerRating from './influencerRating'
import SponsorRating from './sponsorRating'
import {UserRoles} from '../../utils/Constants'

class Rating extends Component {
    render() {
        // TODO: Get role from local storage
        const role = UserRoles.SPONSOR
        let rating = (role === UserRoles.INFLUENCER) ? <InfluencerRating></InfluencerRating> :
            <SponsorRating></SponsorRating>
        return rating
    }
}

export default Rating;