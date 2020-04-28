import React, {Component} from 'react'
import SponsorAnalytics from './SponsorAnalytics'
import InfluencerAnalytics from './InfluencerAnalytics'
import { MY_ROLE, UserRoles } from '../../utils/Constants'
class Analytics extends Component {
    render() {
      let analytics = (MY_ROLE === UserRoles.INFLUENCER )?<InfluencerAnalytics></InfluencerAnalytics>:<SponsorAnalytics></SponsorAnalytics>
      return analytics
  }
}

export default Analytics;