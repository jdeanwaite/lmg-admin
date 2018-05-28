import React, { Component } from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown
} from "reactstrap";
import { Auth } from 'aws-amplify';

export default class NavBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  signOut = () => {
    Auth.signOut()
      .then(() => {
        this.props.onStateChange('signedOut');
      })
      .catch(console.error)
  }

  render() {
    return (
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Learn My Gospel Admin</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/*<NavItem>*/}
            {/*<NavLink href="/components/">Components</NavLink>*/}
            {/*</NavItem>*/}
            {/*<NavItem>*/}
            {/*<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>*/}
            {/*</NavItem>*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.signOut}>Sign Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
