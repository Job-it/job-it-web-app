import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';

class TaskNavBar extends React.Component {
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
          <NavItem eventKey={1} onClick={this.props.switchViews}>
          <Button bsStyle="warning">⬅ All Opportunities</Button>
            </NavItem>
            <NavItem eventKey={2} onClick={() => this.props.openModal()}>
            <Button bsStyle="success"> + Task</Button>
            </NavItem>
            <NavItem eventKey={3} onClick={() => this.props.toggleArchived()}>
            <Button bsStyle="info">{this.props.isArchived ? "Hide Archived" : "Show Archived"}</Button>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={4} href="#"></NavItem>
            <NavItem eventKey={5} href="#">
              <Button bsStyle="danger">Logout</Button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default TaskNavBar;