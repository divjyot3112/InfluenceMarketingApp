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
import Switch from "react-switch";
import {FaUserAlt, FaSignOutAlt, FaSearch} from 'react-icons/fa'
// Redux imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProfile} from "../../actions/userProfileActions";
// CSS
import "../../css/appbar.css";

// Beginning of class
export class Appbar extends Component {
    state = {
        isOpen: false,
        userExists: false,
        firstName: null,
        search: true,
        placeholder: "Search People",
        searchString: ""
    }

    componentWillMount() {
        // TODO: get email from local storage
        // const email = localStorage.getItem("email");
        const email = "divjyot@gmail.com";

        if (email != null) {
            this.props.getProfile(email).then((response) => {
                if (response === undefined && this.props.profile.status === 200) {
                    this.setState({
                        firstName: this.props.profile.data.message.name
                            ? this.props.profile.data.message.name.firstName
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
            placeholder: this.state.placeholder=="Search People"?"Search Tasks":"Search People",
            search: !this.state.search
        })
    }

    onChange = (e) => {
        this.setState({
            searchString: e.target.value
        })
    }

    onSearch = (e) => {
        if(this.state.searchString.length>0) {
            console.log(this.state.searchString)
            this.props.history.push({
                pathname:"/search",
                state: {
                    searchString: this.state.searchString,
                    searchParameter: this.state.search ? "P" : "T"
                }
            })
        }
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
                                <NavItem style={{width: 250, marginLeft: 25}}>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder={this.state.placeholder}
                                            value={this.state.searchString}
                                            onChange={this.onChange}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                onClick={this.onSearch}
                                                variant="outline-success"
                                            >
                                                <FaSearch style={{height: "1em", width:"1.5em"}} />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </NavItem>
                                <NavItem style={{marginLeft: "2%"}}>
                                    <Switch
                                        checked={this.state.search}
                                        onChange={this.handleChange}
                                        handleDiameter={28}
                                        offColor="#08f"
                                        onColor="#0ff"
                                        offHandleColor="#0ff"
                                        offHandle = {
                                            <div>P</div>
                                        }
                                        onHandleColor="#08f"
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
                                                color: "#577284",
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
                                                    color: "#577284",
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