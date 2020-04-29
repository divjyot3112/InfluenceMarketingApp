import React, {Component} from 'react'
import InfluencerDashboard from './InfluencerDashboard'
import SponsorDashboard from './SponsorDashboard'
import {UserRoles} from '../../utils/Constants'
import {getRoleFromLocalStorage} from "../Common/auth";

class Dashboard extends Component {
    render() {
        let dashBoard = (getRoleFromLocalStorage() === UserRoles.INFLUENCER) ?
            <InfluencerDashboard></InfluencerDashboard> : <SponsorDashboard></SponsorDashboard>
        return dashBoard
    }
}

export default Dashboard;