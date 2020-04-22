import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import UserProfile from "./UserProfile/userProfile";
import PostTask from "./Task/postTask";
import Messenger from './Inbox/Messenger'
import SponsorRating from "./Rating/sponsorRating"
import InfluencerRating from "./Rating/influencerRating"
import TaskDescription from './Task/TaskDescription'

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/profile" exact component={UserProfile}/>
                <Route path="/task/new" exact component={PostTask}/>
                <Route path="/task/description" component={TaskDescription}/>
                <Route path="/inbox" exact component={Messenger}/>
                <Route path="/ratings/sponsor" exact component={SponsorRating}/>
                <Route path="/ratings/influencer" exact component={InfluencerRating}/>
            </div>
        );
    }
}

export default Main;
