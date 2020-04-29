import React, {Component} from 'react'
import SponsorHome from './SponsorHome'
import {UserRoles} from '../../utils/Constants'
import {getEmailFromLocalStorage, getRoleFromLocalStorage} from "../Common/auth";
import {Redirect} from "react-router";

class Home extends Component {
    render() {
        let redirectVar = null;
        if (!getEmailFromLocalStorage()) {
            redirectVar = <Redirect to="/"/>;
        }

        if (redirectVar != null)
            return redirectVar;

        const role = getRoleFromLocalStorage();
        let rating = (role === UserRoles.INFLUENCER) ? "" :
            <SponsorHome></SponsorHome>
        return rating
    }
}

export default Home;