import React, {Component} from 'react'
import InfluencerDashboard from './InfluencerDashboard'
import SponsorDashboard from './SponsorDashboard'
import { MY_ROLE, UserRoles } from '../../utils/Constants'
class Dashboard extends Component {
    render() {
      let dashBoard = (MY_ROLE === UserRoles.INFLUENCER )?<InfluencerDashboard></InfluencerDashboard>:<SponsorDashboard></SponsorDashboard>
      return dashBoard
  }
}

export default Dashboard;