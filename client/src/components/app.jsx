import React from 'react';
import ReactDOM from 'react-dom';
import OpportunityView from './opportunities/opportunityView.jsx';
import TaskView from './tasks/taskView.jsx';
import LoginForm from './forms/LoginForm.jsx';
import Modal from 'react-modal';
import interactDnd from '../lib/interactDnd.js';
import Axios from 'axios';

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
    <div >
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      ><LoginForm handleLogin = {this.handleLogin}/></Modal>
      <div className = "app">
          {this.state.taskView ? <TaskView currentOpportunity={this.state.currentOpportunity} currentOpportunityName={this.state.currentOpportunityName} currentOrgName={this.state.currentOrgName} switchViews={this.switchViews}/> : <div></div>}
          {this.state.opportunityView ? <OpportunityView selectOpportunity={this.selectOpportunity} switchViews={this.switchViews}/> : <div></div>}
      </div>
    </div>
    )
  }
}

export default App;