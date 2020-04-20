import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SponsorDashboard from './Dashboard/SponsorDashboard';
import Appbar from './Appbar'

class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/appbar" component={ Appbar } />
                <Route path="/dashboard/sponsor" component={SponsorDashboard} />
            </div>
        )
    }
}

export default Main;