import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SponsorDashboard from './Dashboard/SponsorDashboard';

class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/dashboard" component={SponsorDashboard} />
            </div>
        )
    }
}

export default Main;