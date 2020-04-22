import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SponsorDashboard from './Dashboard/SponsorDashboard';
import InfluencerDashboard from './Dashboard/InfluencerDashboard';
import Appbar from './Common/Appbar'
import UserProfile from "./UserProfile/userProfile";
import PostTask from "./Task/postTask";
import Messenger from './Inbox/Messenger'
import SponsorRating from "./Rating/sponsorRating"
import InfluencerRating from "./Rating/influencerRating"
import TaskDescription from './Task/TaskDescription'
import Sidebar from './Common/Sidebar'

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Appbar} />
                <Route path="/" component={Sidebar} />
                <Route path="/dashboard/sponsor" component={SponsorDashboard} />
                <Route path="/dashboard/influencer" component={InfluencerDashboard} />
                <Route path="/profile" exact component={UserProfile}/>
                <Route path="/task/new" exact component={PostTask}/>
                <Route path="/task/description" component={TaskDescription} />
                <Route path="/inbox" exact component={Messenger} />
                <Route path="/ratings/sponsor" exact component={SponsorRating} />
                <Route path="/ratings/influencer" exact component={InfluencerRating} />
            </div>
        );
    }
}

export default Main;
