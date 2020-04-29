import React, {Component} from 'react'
import InfluencerDashboard from './InfluencerDashboard'
import SponsorDashboard from './SponsorDashboard'
import {UserRoles} from '../../utils/Constants'
import {getEmailFromLocalStorage, getRoleFromLocalStorage} from "../Common/auth";
import {Redirect} from "react-router";

class Dashboard extends Component {
    render() {
        let redirectVar = null;
        if (!getEmailFromLocalStorage()) {
            redirectVar = <Redirect to="/"/>;
        }

        if (redirectVar != null)
            return redirectVar;

        let dashBoard = (getRoleFromLocalStorage() === UserRoles.INFLUENCER) ?
            <InfluencerDashboard></InfluencerDashboard> : <SponsorDashboard></SponsorDashboard>
        return dashBoard
    }
}

export default Dashboard;