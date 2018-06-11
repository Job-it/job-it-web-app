import React from 'react';
import OpportunityView from './opportunities/opportunityView.jsx';
import TaskView from './tasks/taskView.jsx';
import interactDnd from '../lib/interactDnd.js';
import { Route, withRouter } from "react-router-dom";
import axios from 'axios';
import Login from './login/login.jsx'
import Axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    // This is how you reroute in react-router
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
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentDidMount() {
    axios.get('/users').then((res) => {
      var user = JSON.parse(res.headers.user);
      if (user !== undefined) {
        // This is how you reroute in react-router
        this.props.history.push('/dashboard');
      } else {
        // This is how you reroute in react-router
        this.props.history.push('/login');
      }
      });
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
    // This is how you reroute in react-router
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

  handleLogout() {
    Axios.get('/logout').then(() => {
      // This is how you reroute in react-router
      this.props.history.push('/login');
    });
  }

  render() {
    return (
        <div className = "app">
          {/* Routes for react router */}
          <Route path='/dashboard/task' render = { (props) => <TaskView {...props} 
                                        currentOpportunity = { this.state.currentOpportunity } 
                                        currentOpportunityName = { this.state.currentOpportunityName } 
                                        currentOrgName = { this.state.currentOrgName } 
                                        handleLogout = { this.handleLogout }
                                        switchViews = { this.switchViews }/> 
                                        }/>
          <Route exact path='/dashboard' render={ (props) => <OpportunityView {...props} 
                                        selectOpportunity={this.selectOpportunity} 
                                        switchViews={this.switchViews} 
                                        handleLogout = { this.handleLogout }/> 
                                        }/>
          <Route path='/login' component = {Login}/>
        </div>
    )
  }
}

//Main app is wrapped in 'withRouter to enable react-router'
export default withRouter(App);