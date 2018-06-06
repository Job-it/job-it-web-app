import React from 'react';
import ReactDOM from 'react-dom';
import OpportunityView from './opportunities/opportunityView.jsx';
import TaskView from './tasks/taskView.jsx';
import LoginForm from './forms/LoginForm.jsx';
import Modal from 'react-modal';
import interactDnd from '../lib/interactDnd.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  }
};

Modal.setAppElement('#app');

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

  render() {
    return (
      <Router>
      <div >
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Login Modal"
        ><LoginForm closeModal={this.closeModal}/></Modal>
        <div className = "app">
            {this.state.taskView ? <TaskView currentOpportunity={this.state.currentOpportunity} currentOpportunityName={this.state.currentOpportunityName} currentOrgName={this.state.currentOrgName} switchViews={this.switchViews}/> : <div></div>}
            {this.state.opportunityView ? <Route path='/opportunites' component={OpportunityView} selectOpportunity={this.selectOpportunity} switchViews={this.switchViews}/> : <div></div>}
        </div>
      </div>
    </Router>
    )
  }
}

export default App;