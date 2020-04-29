import React, {Component} from 'react'
import SponsorAnalytics from './SponsorAnalytics'
import InfluencerAnalytics from './InfluencerAnalytics'
import {UserRoles} from '../../utils/Constants'
import {getEmailFromLocalStorage, getRoleFromLocalStorage} from "../Common/auth";
import {Redirect} from "react-router";

class Analytics extends Component {
    render() {
        let redirectVar = null;
        if (!getEmailFromLocalStorage()) {
            redirectVar = <Redirect to="/"/>;
        }

        if (redirectVar != null)
            return redirectVar;

        let analytics = (getRoleFromLocalStorage() === UserRoles.INFLUENCER) ?
            <InfluencerAnalytics></InfluencerAnalytics> : <SponsorAnalytics></SponsorAnalytics>
        return analytics
    }
}

export default Analytics;