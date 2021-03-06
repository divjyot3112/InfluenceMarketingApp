import React, {Component} from 'react'
import {TaskStatus} from '../../utils/Constants';
// UI component imports
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    InputGroupAddon,
    InputGroup,
} from 'reactstrap';
import {Button} from 'react-bootstrap'
import Switch from "react-switch";
import {FaSignOutAlt, FaSearch} from 'react-icons/fa'
// Redux imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProfile, deactivateProfile} from "../../actions/userProfileActions";
// CSS
import "../../css/appbar.css";
import {If} from "react-if";
import Avatar from '@material-ui/core/Avatar';
import {getEmailFromLocalStorage, getRoleFromLocalStorage} from "../Common/auth";
import {Redirect} from "react-router";

const UserRoles = require("../../utils/Constants").UserRoles;

export class Appbar extends Component {
    state = {
        isOpen: false,
        userExists: false,
        firstName: null,
        image: "",
        search: true,
        placeholder: "Search People",
        searchString: "",
        role: null
    }

    componentDidMount() {
        const email = getEmailFromLocalStorage();
        const role = getRoleFromLocalStorage();
        console.log("Component Did Mount")
        this.setState({role: role});
        if (email != null) {
            this.props.getProfile(email).then((response) => {
                if (response === undefined && this.props.profile.status === 200) {
                    this.setState({
                        firstName: this.props.profile.data.message.name
                            ? this.props.profile.data.message.name.firstName
                            : "",
                        address: this.props.profile.data.message.address
                            ? this.props.profile.data.message.address
                            : "",
                        image: this.props.profile.data.message
                            ? this.props.profile.data.message.image
                            : "",
                        userExists: true
                    })
                }
            })
        }
    }

    componentWillReceiveProps(props) {
        if (props.location.state && props.location.state.loggedIn !== this.state.loggedIn) {

            this.setState({loggedIn: props.location.state.loggedIn})
            const email = getEmailFromLocalStorage();

            if (email != null) {
                this.props.getProfile(email).then((response) => {
                    if (response === undefined && this.props.profile.status === 200) {
                        this.setState({
                            firstName: this.props.profile.data.message.name
                                ? this.props.profile.data.message.name.firstName
                                : "",
                            address: this.props.profile.data.message.address
                                ? this.props.profile.data.message.address
                                : "",
                            image: this.props.profile.data.message
                                ? this.props.profile.data.message.image
                                : "",
                            userExists: true,
                            role: this.props.profile.data.role
                        })
                    }
                })
            }
        }
    }

    // For toggling open and close of Navbar
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleChange = () => {
        this.setState({
            placeholder: this.state.placeholder == "Search Tasks" ? "Search People" : "Search Tasks",
            search: !this.state.search
        })
    }

    onChange = (e) => {
        this.setState({
            searchString: e.target.value
        })
    }

    onSearch = (e) => {
        if (this.state.searchString.length > 0) {
            // console.log(this.state.searchString)
            this.state.search ? (
                this.props.history.push({
                    pathname: "/search/people",
                    state: {
                        searchString: this.state.searchString,
                        address: this.state.address
                    }
                })
            ) : (
                this.props.history.push({
                    pathname: "/search/tasks",
                    state: {
                        searchString: this.state.searchString,
                        status: TaskStatus.ALL,
                    }
                })
            )


        }
    };

    handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        window.location.href = "/";
    };

    handleDeactivateAccount = () => {
        const password = prompt("Please enter your password to deactivate your account:");

        const email = getEmailFromLocalStorage()

        if (password != null) {
            if (password !== "") {
                const data = {
                    password: password
                }
                this.props.deactivateProfile(data, email).then((res) => {
                    if (res) {
                        window.alert("Cannot deactivate your account now. Please try again later.")
                    } else {
                        console.log(this.props.deactivateProfile)
                        window.alert("Your account has been deactivated successfully.")
                        this.handleLogout();
                    }
                });
            } else {
                window.alert("Password cannot be empty")
            }
        }
    }

    loadMyProfile = () => {
        this.props.history.push({
            pathname: "/profile",
            state: {
                email: getEmailFromLocalStorage()
            }
        })
        window.location.reload()
    }

    render() {
        let redirectVar = null;
        if (!getEmailFromLocalStorage()) {
            redirectVar = <Redirect to="/"/>;
        }

        return (
            <React.Fragment>
                {redirectVar}
                <div>
                    <Navbar color="dark" expand="md" className="navbar-main">
                        <NavbarBrand href="/home" className="navbar-brand">Together</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar className="navbar-search-main">
                                <NavItem className="search">

                                    <InputGroup>
                                        <Input
                                            type="text"
                                            className="form-control search-text"
                                            placeholder={this.state.placeholder}
                                            value={this.state.searchString}
                                            onChange={this.onChange}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                className="search-button"
                                                onClick={this.onSearch}
                                                variant="outline-success"
                                            >
                                                <FaSearch/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>

                                </NavItem>
                                <NavItem className="toggle-button">
                                    <Switch
                                        checked={this.state.search}
                                        onChange={this.handleChange}
                                        handleDiameter={28}
                                        offColor="#5AC560"
                                        onColor="#fff"
                                        offHandleColor="#fff"
                                        offHandle={
                                            <div>P</div>
                                        }
                                        onHandleColor="#5AC560"
                                        height={40}
                                        width={90}
                                        uncheckedIcon={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    fontSize: 15,
                                                    color: "#fff",
                                                    paddingRight: 2
                                                }}
                                            >
                                                <b>Tasks</b>
                                            </div>
                                        }
                                        checkedIcon={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    fontSize: 15,
                                                    color: "#000",
                                                    paddingRight: 2
                                                }}
                                            >
                                                <b>People</b>
                                            </div>
                                        }
                                        className="react-switch"
                                        id="icon-switch"
                                    />
                                </NavItem>
                            </Nav>

                            <Nav navbar className="navbar-profile-main">
                                <NavItem className="nav-item-box">

                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret style={{color: "white"}}>
                                            <Avatar src={this.state.image} className="profile-image"/>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem className="drop-down-item">
                                                <NavLink onClick={this.loadMyProfile}>
                                                    My Profile
                                                </NavLink>
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem className="drop-down-item">
                                                <NavLink onClick={this.handleDeactivateAccount}>
                                                    Deactivate Account
                                                </NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                </NavItem>
                                <div className="vertical"></div>

                                <NavItem className="nav-item-box nav-home">
                                    <NavLink href="/home"><p>Home</p></NavLink>
                                </NavItem>
                                <div className="vertical"></div>

                                <If condition={this.state.role === UserRoles.SPONSOR}>
                                    <React.Fragment>
                                        <NavItem className="nav-item-box">
                                            <NavLink href="/task/new"><p>Create</p></NavLink>
                                        </NavItem>
                                        <div className="vertical"></div>
                                    </React.Fragment>
                                </If>

                                <If condition={this.state.role === UserRoles.INFLUENCER}>
                                    <React.Fragment>
                                        <NavItem className="nav-item-box">
                                            <NavLink href="/ratings"><p>Ratings</p></NavLink>
                                        </NavItem>
                                        <div className="vertical"></div>
                                    </React.Fragment>
                                </If>

                                <NavItem className="nav-item-box">
                                    <NavLink href="/inbox"><p>Inbox</p></NavLink>
                                </NavItem>
                                <div className="vertical"></div>

                                <NavItem className="nav-item-box">
                                    <NavLink className="link-icon" onClick={this.handleLogout}>
                                        <span>Log Out &nbsp; <FaSignOutAlt/></span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                        </Collapse>
                    </Navbar>
                </div>
            </React.Fragment>
        )
    }
}

// Defining proptypes
Appbar.protoTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    deactivateProfile: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        profile: state.userProfile.profile,
        deactivateProfile: state.userProfile.deactivateProfile
    };
}

export default connect(mapStateToProps, {getProfile, deactivateProfile})(Appbar);