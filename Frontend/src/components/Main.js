import React, { Component } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import UserProfile from "./UserProfile/userProfile";
import PostTask from "./Task/postTask";
import Messenger from "./Inbox/Messenger";
import SponsorRating from "./Rating/sponsorRating";
import InfluencerRating from "./Rating/influencerRating";
import TaskDescription from "./Task/TaskDescription";
import Appbar from "./Common/Appbar";
import Sidebar from "./Common/Sidebar";
import Landing from "./LandingPage/LandingPage";
import SponsorHome from "./Home/SponsorHome";

class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Appbar} />
        <Route path="/" component={Sidebar} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/profile" exact component={UserProfile} />
        <Route path="/task/new" exact component={PostTask} />
        <Route path="/task" exact component={TaskDescription} />
        <Route path="/inbox" exact component={Messenger} />
        <Route path="/ratings/sponsor" exact component={SponsorRating} />
        <Route path="/ratings/influencer" exact component={InfluencerRating} />

        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Landing} />
        <Route exact path="/home/sponsor" component={SponsorHome} />
      </div>
    );
  }
}

export default Main;
