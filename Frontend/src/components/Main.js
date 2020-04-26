import React, { Component } from "react";
import { Route } from "react-router-dom";
// Routes
// Common
import Appbar from "./Common/Appbar";
import Sidebar from "./Common/Sidebar";
import Search from "./Common/Search";
// User Profile
import UserProfile from "./UserProfile/userProfile";
// Dashboard
import Dashboard from "./Dashboard/Dashboard";
// Task
import PostTask from "./Task/postTask";
// Inbox
import Messenger from "./Inbox/Messenger";
// Rating
import SponsorRating from "./Rating/sponsorRating";
import InfluencerRating from "./Rating/influencerRating";
import TaskDescription from "./Task/TaskDescription";
import Landing from "./LandingPage/LandingPage";
import SponsorHome from "./Home/SponsorHome";
import About from "./About/About";

class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Appbar} />
        <Route path="/" component={Sidebar} />
        <Route path="/search" exact component={Search} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/profile" exact component={UserProfile} />
        <Route path="/task/new" exact component={PostTask} />
        <Route path="/task" exact component={TaskDescription} />
        <Route path="/inbox" exact component={Messenger} />
        <Route path="/ratings/sponsor" exact component={SponsorRating} />
        <Route path="/ratings/influencer" exact component={InfluencerRating} />

        <Route exact path="/" component={Landing} />

        <Route path="/home" component={Landing} />
        <Route path="/home/sponsor" component={SponsorHome} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default Main;
