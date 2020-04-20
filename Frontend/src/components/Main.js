import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SponsorDashboard from './Dashboard/SponsorDashboard';
import Appbar from './Common/Appbar'
import UserProfile from "./UserProfile/userProfile";
import PostTask from "./Task/postTask";
import Messenger from './Inbox/Messenger'
import SponsorRating from "./Rating/sponsorRating"
import InfluencerRating from "./Rating/influencerRating"

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/appbar" component={ Appbar } />
                <Route path="/dashboard/sponsor" component={SponsorDashboard} />
                <Route path="/profile" exact component={UserProfile}/>
                <Route path="/task/new" exact component={PostTask}/>
                <Route path="/inbox" exact component={Messenger} />
                <Route path="/ratings/sponsor" exact component={SponsorRating} />
                <Route path="/ratings/influencer" exact component={InfluencerRating} />
            </div>
        );
    }
}

export default Main;
