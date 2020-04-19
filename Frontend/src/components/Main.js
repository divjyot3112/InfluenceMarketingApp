import React, {Component} from "react";
import {Route} from "react-router-dom";
import SponsorDashboard from "./Dashboard/SponsorDashboard";
import UserProfile from "./UserProfile/userProfile";
import PostTask from "./Task/postTask";

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/dashboard/sponsor" exact component={SponsorDashboard}/>
                <Route path="/profile" exact component={UserProfile}/>
                <Route path="/task/new" exact component={PostTask}/>
            </div>
        );
    }
}

export default Main;
