import React, { Component } from 'react'
// UI imports
import { slide as Menu} from 'react-burger-menu';
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
    NavbarText,
    Input,
    Button,
    InputGroupAddon,
    InputGroup,
    InputGroupText,
} from 'reactstrap';
import { Image, } from 'react-bootstrap'
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa' 
// Redux imports
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/userProfileActions";
// CSS
import "./styles.css";


// Beginning of class
export class Appbar extends Component {
    state = {
        isOpen: false,
        userExists: false,
        profile: null
    }

    componentWillMount() {
        if(localStorage.getItem('email')!=null) {
            this.props.getProfile(localStorage.getItem('email'), (response) => {
                console.log(response.status)
                if(response.status === 200) {
                    this.setState({
                        profile: response.data.message,
                        userExists: true
                    })
                }
            })
            this.setState({
                profile: this.props.profile
            })
        } else {
            this.setState({
                userExists: false
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
        let role = null
        console.log(this.state.profile)
        if(this.state.userExists) {
            role = this.state.profile.role
            username = <NavLink href="/profile">{this.state.profile.name?this.state.profile.name.firstName:"Hello"}</NavLink>
        } else {
            username = "Login or SignUp"
        }
        let dashLink = role ? (role=="Influencer" ? "/dashboard/influencer" : "/dashboard/sponsor" ) : "/"
        let rateLink = role ? (role=="Influencer" ? "/ratings/influencer" : "/ratings/sponsor" ) : "/" 
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Influence Marketing App</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar></Collapse>
                    <Nav className="mr-auto" navbar>
                        <NavItem style={{width:350}}>
                            <InputGroup>
                                <Input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search People and Jobs"
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary">
                                        Go
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </NavItem>
                        <NavItem style={{marginLeft:25}}>
                            <FaUserAlt style={{height:40}} /> {/* To do -> add profile picture of user */}
                        </NavItem>
                        <NavItem style={{marginLeft:25, background:"#dadee3"}}>
                            { username }
                        </NavItem>
                        <NavItem style={{marginLeft:20, color:"#ff9191"}}>
                            Sign Out <FaSignOutAlt style={{height:40}} /> {/*Redirect to signout*/}
                        </NavItem >
                    </Nav>
                </Navbar>
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

// Defining props
Appbar.protoTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfile } ) (Appbar);