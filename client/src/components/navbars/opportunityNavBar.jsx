import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

class OpportunityNavBar extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <img src = "img/dogotxt.png" className = "navbar-logo"></img>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={3} href="#"></NavItem>
            <NavItem eventKey={4} href="#">
            <Button bsStyle="danger" onClick = {this.props.handleLogout}>Logout</Button>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.props.openCreateOpportunityModal}>
            </NavItem>
            <NavItem eventKey={2} onClick={this.props.toggleArchived}>
            <Button bsStyle="info">{this.props.isArchived ? "Hide Archived" : "Show Archived"}</Button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default OpportunityNavBar;