import React, { Component } from 'react'
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
import { Image, Button } from 'react-bootstrap'
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa' 
// Redux imports
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/userProfileActions";

// Beginning of class
export class Appbar extends Component {
    state = {
        isOpen: false,
        userExists: false,
        firstName: null
    }
    componentWillMount() {
        if(localStorage.getItem('email')!=null) {
            this.props.getProfile(localStorage.getItem('email'), (response) => {
                console.log(response.status)
                if(response.status === 200) {
                    this.setState({
                        firstName: response.data.message.name?response.data.message.name.firstName : "",
                        userExists: true
                    })
                }
            })
        } else {
            this.setState({
                userExists: false
            })
        }
    }

    // For toggling open and close of Navbar
    toggle = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        let username = null;
        console.log(this.state.firstName)
        if(this.state.userExists) {
            username = <NavLink href="/profile">{this.state.firstName?this.state.firstName:"Hello"}</NavLink>
        } else {
            username = "Login or SignUp"
        }
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Influence Marketing App</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem style={{width:350, marginLeft:25}}>
                                <InputGroup>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Search People and Jobs"
                                        // height={}
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
                            <NavItem style={{marginLeft:25}}>
                                <FaUserAlt style={{height:40}} /> {/* To do -> add profile picture of user */}
                            </NavItem>
                            <NavItem style={{marginLeft:25, background:"#dadee3"}}>
                                { username }
                            </NavItem>
                            <NavItem style={{marginLeft:25, color:"#ff9191"}}>
                                <NavLink>Sign Out <FaSignOutAlt style={{}} /></NavLink> {/*Redirect to signout*/}
                            </NavItem >
                        </Nav>
                    </Collapse>
                </Navbar>
                {/* <Sidebar /> */}
            </div>
        )
    }
}

// Defining props
Appbar.protoTypes = {
    getProfile: PropTypes.func.isRequired,
    // profile: PropTypes.object.isRequired
}

export default connect(null, { getProfile } ) (Appbar);