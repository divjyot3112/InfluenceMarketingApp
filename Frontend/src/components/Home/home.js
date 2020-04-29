import React, {Component} from 'react'
import SponsorHome from './SponsorHome'
import {UserRoles} from '../../utils/Constants'
import {getRoleFromLocalStorage} from "../Common/auth";

class Home extends Component {
    render() {
        const role = getRoleFromLocalStorage();
        let rating = (role === UserRoles.INFLUENCER) ? "" :
            <SponsorHome></SponsorHome>
        return rating
    }
}

export default Home;