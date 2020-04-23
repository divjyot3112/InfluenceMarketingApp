import React, {Component} from 'react'
//UI imports
import {slide as Menu} from 'react-burger-menu';
// Redux imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProfile} from "../../actions/userProfileActions";
// CSS
import "../../css/sidebar.css";

const UserRoles = require("../../utils/Constants").UserRoles;

export class Sidebar extends Component {
    state = {
        userExists: false,
        role: null
    }

    componentWillMount() {
        // TODO: get email from local storage
        // const email = localStorage.getItem("email");
        const email = "divjyot@gmail.com";

        if (email != null) {
            this.props.getProfile(email).then((response) => {
                if (response === undefined && this.props.profile.status === 200) {
                    this.setState({
                        firstName: this.props.profile.data.message
                            ? this.props.profile.data.message.name.firstName
                            : "",
                        userExists: true,
                        role: this.props.profile.data.role
                    })
                }
            })
        }
    }


    render() {
        const role = this.state.userExists ? this.state.role : null;
        const dashboardLink = role ? (role == UserRoles.INFLUENCER ? "/dashboard/influencer" : "/dashboard/sponsor") : "/"
        const ratingLink = role ? (role == UserRoles.INFLUENCER ? "/ratings/influencer" : "/ratings/sponsor") : "/"

        return (
            <div>
                <Menu>
                    <a className='menu-item' href='/'>Home</a>
                    <a className='menu-item' href='/profile'>Profile</a>
                    <a className='menu-item' href={dashboardLink}>Dashboard</a>
                    <a className='menu-item' href="/">Analytics</a>
                    <a className='menu-item' href='/inbox'>Inbox</a>
                    <a className='menu-item' href={ratingLink}>My Ratings</a>
                </Menu>
            </div>
        )
    }
}

Sidebar.protoTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        profile: state.userProfile.profile
    };
}

export default connect(mapStateToProps, {getProfile})(Sidebar)
