import React, { Component } from 'react'
//UI imports
import { slide as Menu} from 'react-burger-menu';
// Redux imports
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/userProfileActions";
// CSS
import "../../css/sidebar.css";

export class Sidebar extends Component {
    state = {
        userExists: false,
        role: null
    }
    componentWillMount() {
        if(localStorage.getItem('email')!=null) {
            this.props.getProfile(localStorage.getItem('email'), (response) => {
                console.log(response.status)
                if(response.status === 200) {
                    this.setState({
                        role: response.data.message.role,
                        userExists: true
                    })
                }
            })
            // this.setState({
            //     profile: this.props.profile
            // })
        } else {
            this.setState({
                userExists: false
            })
        }
    }
    render() {
        let role = null
        // console.log(this.state)
        if(this.state.userExists) {
            role = this.state.role
        }
        let dashLink = role ? (role=="Influencer" ? "/dashboard/influencer" : "/dashboard/sponsor" ) : "/"
        let rateLink = role ? (role=="Influencer" ? "/ratings/influencer" : "/ratings/sponsor" ) : "/" 
        return (
            <div>
                <Menu>
                    <a className='menu-item' href='/'>Home</a>
                    <a className='menu-item' href='/profile'>Profile</a>
                    <a className='menu-item' href={dashLink}>Dashboard</a>
                    <a className='menu-item' href="/">Analytics</a>
                    <a className='menu-item' href='/inbox'>Inbox</a>
                    <a className='menu-item' href={rateLink}>My Ratings</a>
                </Menu>
            </div>
        )
    }
}

Sidebar.protoTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

export default connect(null, { getProfile } ) (Sidebar)
