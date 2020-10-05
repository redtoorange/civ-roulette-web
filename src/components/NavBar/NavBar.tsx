import React, {Component} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Link, NavLink as RouterNavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoffee} from "@fortawesome/free-solid-svg-icons";

interface NavBarState {
    isOpen: boolean;
}

class NavBar extends Component<any, NavBarState> {
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState(prev => ({isOpen: !prev.isOpen}))
    }

    render() {
        return (
            <nav>
                <Navbar color="dark" dark expand="md" className="fixed-top">
                    <NavbarBrand to="/" tag={Link} className="mr-5">
                        <FontAwesomeIcon icon={faCoffee} />
                        <strong className="ml-2">Civ Roulette 2.0</strong>
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink to="/" exact={true} tag={RouterNavLink}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/spins" tag={RouterNavLink}>Spins</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/challenges" tag={RouterNavLink}>Challenges</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </nav>
        );
    }


}

export default NavBar;
