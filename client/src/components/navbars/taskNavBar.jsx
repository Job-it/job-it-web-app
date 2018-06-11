import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

class TaskNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar >
        <img src = "../../img/dogotxt.png" className = "navbar-logo"/>
        <Navbar.Header>
          <Navbar.Brand>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={this.props.switchViews}>
              <Button className = "btn-all-opps" bsStyle="warning">⬅ All Opportunities</Button>
            </NavItem>
              {/* click toggles tasks rendered by isArchived field */}
            <NavItem eventKey={2} onClick={() => this.props.toggleArchived()}>
              <Button bsStyle="info">{this.props.isArchived ? "Hide Archived" : "Show Archived"}</Button>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={4} href="#">
              <Button bsStyle="danger" onClick = {this.props.handleLogout}>Logout</Button>
              {/* This button will trigger a logout and destroy the user session. */}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default TaskNavBar;