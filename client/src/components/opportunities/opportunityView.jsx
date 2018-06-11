import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import interact from 'interactjs';
import OpportunityColumn from './opportunityColumn.jsx';
import CreateOpportunityForm from '../forms/opportunityForm.jsx';
import UpdateOpportunityForm from '../forms/updateOpportunityForm.jsx';
import OpportunityNavBar from '../navbars/opportunityNavBar.jsx'

Modal.setAppElement('#app');

class OpportunityView extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      status: ['Exploratory', 'Qualified', 'Outreach', 'Communication', 'Negotiation'],
      createModalIsOpen: false, 
      updateModalIsOpen: false,
      opportunities: [],
      opportunityToUpdate: {},
      selectedStatus: '',
      isArchived: false,
      user: ''
    };
    this.openCreateOpportunityModal = this.openCreateOpportunityModal.bind(this);
    this.openUpdateOpportunityModal = this.openUpdateOpportunityModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.archiveOpportunity = this.archiveOpportunity.bind(this);
    this.updateOpportunity = this.updateOpportunity.bind(this);
    this.toggleArchived = this.toggleArchived.bind(this);
  }

  openCreateOpportunityModal(oppStatus) {
    this.setState({createModalIsOpen: true, selectedStatus: oppStatus});
  }

  openUpdateOpportunityModal(id) {
    this.setState({
      updateModalIsOpen: true,
      opportunityToUpdate: this.state.opportunities.filter((opp) => opp._id === id)[0]
    });
  }

  afterOpenModal() {
  //
  }

  closeModal() {
    this.setState({
      createModalIsOpen: false,
      updateModalIsOpen: false
    });
    this.getOpportunities();
  }

  getOpportunities() {
    axios.get('/opportunities', {params: {isArchived: (this.state.isArchived ? true : false)}}).then((response) => {
      var userName = JSON.parse(response.headers.user).userName;
      this.setState({
        opportunities: response.data,
        user: userName
      });
    });
  }

  deleteOpportunity(oppId) {
    axios.delete('/opportunities', {params: {_id: oppId}}).then(()=>{
      this.getOpportunities();
    });
  }

  updateOpportunity(id, status) {
    var updateObj = this.state.opportunities.filter((opportunity) => opportunity._id === id)[0];
    //capitalize the first letter in the status column
    updateObj.status = status[0].toUpperCase() + status.slice(1);
    //patch db and get update
    axios.patch('/opportunities', {updateObj: updateObj}).then(()=>{
      this.getOpportunities();
    });
  }

  archiveOpportunity(id, oppIsArchived) {
    axios.patch('/opportunities', {updateObj: {_id: id, isArchived: !oppIsArchived}})
    .then(() => {
      this.getOpportunities();
    })
    .catch((err) => {
      console.error('There was an error archiving the opportunity: ', err);
    });
  }

  toggleArchived() {
    this.setState({
      isArchived: this.state.isArchived ? false : true
    }, () => this.getOpportunities());
  }

  componentDidMount() {
    this.getOpportunities();

      //USING INTERACT JS FOR DRAG AND DROP
      //SEE '../../lib/interactDnd.js' for reference


      //When an opportunity card is not dropped into a separate column,
      //Return the card back to it's original column by clearing
      //And then re-populating the opportunities array in the state.
      interact('.draggable-opportunity').draggable({
        onend: () => {
          
          //Oms setTimeout hack
          setTimeout(() => {
            var currentOpportunities = this.state.opportunities;
            this.setState({
              opportunities: [],
            });
            this.setState({
              opportunities: currentOpportunities,
            });
          }, 0);
        }
      });
  }

  render() {
      return (
        <div id='view-wrapper'>
          <OpportunityNavBar handleLogout = {this.props.handleLogout} openCreateOpportunityModal={this.openCreateOpportunityModal} toggleArchived={this.toggleArchived} isArchived={this.state.isArchived}/>
          <div className='page-header'>
            <h1>{this.state.user}<br /><small>Opportunities Dashboard</small></h1>
          </div>
          <Modal
            className='modal-form'
            overlayClassName='modal-overlay'
            isOpen={this.state.createModalIsOpen || this.state.updateModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="New Job.it Opportunity"
          >
            <button className='close-modal' onClick={this.closeModal}>X</button> 
            {/* The ternary operators below enable the create and update opportunity forms to render on click from the user. */}
            {this.state.createModalIsOpen ? <CreateOpportunityForm columnName={this.state.selectedStatus}  close = {() => {this.closeModal()}}/> : <div></div>}
            {this.state.updateModalIsOpen ? <UpdateOpportunityForm  opportunityToUpdate = {this.state.opportunityToUpdate} 
                                                                    close = {() => {this.closeModal()}}/> : <div></div>}
          </Modal>
          <div id='columns-wrapper' >
            {this.state.status.map((status) => {
                return <OpportunityColumn 
                          openCreateOpportunityModal={this.openCreateOpportunityModal}
                          deleteOpp = {(id) => {this.deleteOpportunity(id)}} 
                          selectOpportunity={this.props.selectOpportunity} 
                          status={status}
                          archiveOpportunity={this.archiveOpportunity} 
                          update = {(opp) => {this.openUpdateOpportunityModal(opp)}}
                          updateOpportunity = {this.updateOpportunity}
                          itemsToRender={this.state.opportunities.filter((opportunity) => {
                            return opportunity.status === status;
                            })}
            />
            })}
          </div>
        </div>
      )
  }

}

export default OpportunityView;