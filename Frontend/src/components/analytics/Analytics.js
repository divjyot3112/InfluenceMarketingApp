import React, {Component} from 'react'
import SponsorAnalytics from './SponsorAnalytics'
import InfluencerAnalytics from './InfluencerAnalytics'
import {UserRoles} from '../../utils/Constants'
import {getRoleFromLocalStorage} from "../Common/auth";

class Analytics extends Component {
    render() {
        let analytics = (getRoleFromLocalStorage() === UserRoles.INFLUENCER) ?
            <InfluencerAnalytics></InfluencerAnalytics> : <SponsorAnalytics></SponsorAnalytics>
        return analytics
    }
}

export default Analytics;