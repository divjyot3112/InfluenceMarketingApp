import React, {Component} from 'react'
import InfluencerRating from './influencerRating'
import SponsorRating from './sponsorRating'
import {UserRoles} from '../../utils/Constants'
import {getEmailFromLocalStorage, getRoleFromLocalStorage} from "../Common/auth";
import {Redirect} from "react-router";

class Rating extends Component {
    render() {
        let redirectVar = null;
        if (!getEmailFromLocalStorage()) {
            redirectVar = <Redirect to="/"/>;
        }

        if (redirectVar != null)
            return redirectVar;

        const role = getRoleFromLocalStorage();
        let rating = (role === UserRoles.INFLUENCER) ? <InfluencerRating></InfluencerRating> :
            <SponsorRating></SponsorRating>
        return rating
    }
}

export default Rating;