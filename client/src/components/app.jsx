import React from 'react';
import ReactDOM from 'react-dom';
import OpportunityView from './opportunities/opportunityView.jsx';
import TaskView from './tasks/taskView.jsx';
import LoginForm from './forms/LoginForm.jsx';
import interactDnd from '../lib/interactDnd.js';
import { Route, withRouter } from "react-router-dom";
import Axios from 'axios';
import Login from './login/login.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push('/login');
    this.state = {
        modalIsOpen: true,
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
    this.props.history.push(`/dashboard/task/${orgName.split(' ').join('')}-${opportunityName.split(' ').join('')}`);
    this.setState({
      currentOpportunity: opportunityId,
      currentOpportunityName: opportunityName,
      currentOrgName: orgName,
    });
  }

  switchViews() {
    this.props.history.push('/dashboard');
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
    // function openInNewTab(url) {
    //   var win = window.open(url, '_blank');
    //   win.focus();
    // }
    // openInNewTab('/auth/github');
    this.closeModal();
  }

  render() {
    return (
        <div className = "app">
          <Route path='/dashboard/task' render={(props) => <TaskView {...props} currentOpportunity={this.state.currentOpportunity} currentOpportunityName={this.state.currentOpportunityName} currentOrgName={this.state.currentOrgName} switchViews={this.switchViews}/>}/>
          <Route exact path='/dashboard' render={(props) => <OpportunityView {...props} selectOpportunity={this.selectOpportunity} switchViews={this.switchViews} />}/>
          <Route path='/login' component = {Login}/>
        </div>
    )
  }
}

export default withRouter(App);