import React, {Component} from 'react'
// Importing Sidebar
// import Sidebar from './Sidebar'
// UI component imports
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    NavbarText,
    Input,
    // Button,
    InputGroupAddon,
    InputGroup,
    // InputGroupText,
} from 'reactstrap';
import {Image, Button} from 'react-bootstrap'
import {FaUserAlt, FaSignOutAlt} from 'react-icons/fa'
// Redux imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProfile} from "../../actions/userProfileActions";
import "../../css/appbar.css";

// Beginning of class
export class Appbar extends Component {
    state = {
        isOpen: false,
        userExists: false,
        firstName: null
    }

    componentWillMount() {
        // TODO: get email from local storage
        // const email = localStorage.getItem("email");
        const email = "divjyot@gmail.com";

        if (email != null) {
            this.props.getProfile(email, (response) => {
                if (response.status === 200) {
                    this.setState({
                        firstName: response.data.message.name ? response.data.message.name.firstName : "",
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

    render() {
        let username = null;

        if (this.state.userExists) {
            username = <NavLink href="/profile">{this.state.firstName ? this.state.firstName : ""}</NavLink>
        }

        return (
            <React.Fragment>
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/" className="navbar-brand">Together</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem style={{width: 350, marginLeft: 25}}>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search People and Tasks"
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button variant="outline-success">
                                                Go
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </NavItem>
                            </Nav>
                            <Nav navbar>
                                <NavItem style={{marginLeft: 25}}>
                                    <FaUserAlt style={{height: 40}}/> {/* To do -> add profile picture of user */}
                                </NavItem>
                                <NavItem style={{marginLeft: 25, background: "#dadee3"}}>
                                    {username}
                                </NavItem>
                                <NavItem style={{marginLeft: 25, color: "#ff9191"}}>
                                    <NavLink>Sign Out <FaSignOutAlt style={{}}/></NavLink> {/*Redirect to signout*/}
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

// Defining props
Appbar.protoTypes = {
    getProfile: PropTypes.func.isRequired,
    // profile: PropTypes.object.isRequired
}

export default connect(null, {getProfile})(Appbar);