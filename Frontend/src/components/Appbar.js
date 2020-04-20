import React, { Component } from 'react'
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
import {
    Image,

} from 'react-bootstrap'
import {
    FaUserAlt
} from 'react-icons/fa' 

export class Appbar extends Component {
    state = {
        isOpen: false
    }
    componentWillMount {
        
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Influence Marketing App</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar></Collapse>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <InputGroup>
                                <Input type="text" className="form-control" placeholder="Search"/>
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary">
                                        Go
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </NavItem>
                        <NavItem style={{marginLeft:15}}>
                            <FaUserAlt style={{}} />
                        </NavItem>
                        <NavItem style={{marginLeft:15}}>
                            {}
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Appbar