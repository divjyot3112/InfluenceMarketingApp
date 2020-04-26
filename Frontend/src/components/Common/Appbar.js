import React, {Component} from 'react'
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
import {Redirect} from "react-router";
import Switch from "react-switch";
import {FaSignOutAlt, FaSearch} from 'react-icons/fa'
// Redux imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProfile} from "../../actions/userProfileActions";
// CSS
import "../../css/appbar.css";
import {If} from "react-if";
import Avatar from '@material-ui/core/Avatar';

const UserRoles = require("../../utils/Constants").UserRoles;

export class Appbar extends Component {
    state = {
        isOpen: false,
        userExists: false,
        firstName: null,
        image: "",
        search: true,
        placeholder: "Search Tasks",
        searchString: "",
        role: null
    }

    componentWillMount() {
        // TODO: get email from local storage
        // const email = localStorage.getItem("email");
        const email = "divjyot@gmail.com";
        const role = UserRoles.SPONSOR;

        this.setState({role: role});

        if (email != null) {
            this.props.getProfile(email).then((response) => {
                if (response === undefined && this.props.profile.status === 200) {
                    this.setState({
                        firstName: this.props.profile.data.message.name
                            ? this.props.profile.data.message.name.firstName
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
            console.log(this.state.searchString)
            this.props.history.push({
                pathname: "/search",
                state: {
                    searchString: this.state.searchString,
                    searchParameter: this.state.search ? "P" : "T"
                }
            })
        }
    };

    handleLogout = () => {
        console.log("logout")
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        return <Redirect to="/home"/>;
    };

    render() {
        let username = null;

        return (
            <React.Fragment>
                <div>
                    <Navbar color="dark" expand="md" className="navbar-main">
                        <NavbarBrand href="/" className="navbar-brand">Together</NavbarBrand>
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
                                                <b>People</b>
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
                                                <b>Tasks</b>
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
                                                <NavLink href="/profile">
                                                    My Profile
                                                </NavLink>
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem className="drop-down-item">
                                                <NavLink href="/profile">
                                                    Deactivate Account
                                                </NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                </NavItem>
                                <div className="vertical"></div>

                                <NavItem className="nav-item-box nav-home">
                                    <NavLink href="/"><p>Home</p></NavLink>
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

                                <NavItem className="nav-item-box">
                                    <NavLink href="/inbox"><p>Inbox</p></NavLink>
                                </NavItem>
                                <div className="vertical"></div>

                                <NavItem className="nav-item-box">
                                    <NavLink
                                        className="link-icon"
                                        onClick={this.handleLogout}
                                        href="/home">
                                        <span>Log Out &nbsp; <FaSignOutAlt/></span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                        </Collapse>
                    </Navbar>
                    {/* <Sidebar /> */}
                </div>
            </React.Fragment>
        )
    }
}

// Defining proptypes
Appbar.protoTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        profile: state.userProfile.profile
    };
}

export default connect(mapStateToProps, {getProfile})(Appbar);