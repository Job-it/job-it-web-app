import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class OpportunityNavBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }



  render() {
    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">Job.it</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          <NavItem eventKey={1} onClick={this.props.toggleArchived}>
            {this.props.isArchived ? "Hide Archived" : "Show Archived"}
            </NavItem>
            <NavItem eventKey={2} onClick={this.props.openCreateOpportunityModal}>
            + Opportunity
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="#"></NavItem>
            <NavItem eventKey={4} href="#">
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default OpportunityNavBar;