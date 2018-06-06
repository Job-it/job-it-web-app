import React from 'react';
import ReactDOM from 'react-dom';
import OpportunityView from './opportunities/opportunityView.jsx';
import TaskView from './tasks/taskView.jsx';
import LoginForm from './forms/LoginForm.jsx';
import interactDnd from '../lib/interactDnd.js';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        modalIsOpen: true,
        taskView: false,
        opportunityView: true,
        currentOpportunity: null,
        currentOpportunityName: null,
        currentOrgName: null,
    };
    this.selectOpportunity = this.selectOpportunity.bind(this);
    this.switchViews = this.switchViews.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  selectOpportunity(opportunityId, opportunityName, orgName) {
    this.setState({
      currentOpportunity: opportunityId,
      currentOpportunityName: opportunityName,
      currentOrgName: orgName,
      taskView: this.state.taskView ? false : true,
      opportunityView: this.state.opportunityView ? false : true
    });
  }

  switchViews() {
    this.setState({
        taskView: this.state.taskView ? false : true,
        opportunityView: this.state.opportunityView ? false : true
    });
  }
  
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  handleLogin() {
    function openInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
    }
    openInNewTab('/auth/github');
    this.closeModal();
  }

  render() {
    return (
      <Router>
        <div >
          <div className = "app">
            <Route path='/tasks' component={TaskView} currentOpportunity={this.state.currentOpportunity} currentOpportunityName={this.state.currentOpportunityName} currentOrgName={this.state.currentOrgName} switchViews={this.switchViews}/>
            <Route path='/opportunities' component={OpportunityView} selectOpportunity={this.selectOpportunity} switchViews={this.switchViews}/>
          </div>
          <Redirect to='/opportunities' />
        </div>
      </Router>
    )
  }
}

export default App;