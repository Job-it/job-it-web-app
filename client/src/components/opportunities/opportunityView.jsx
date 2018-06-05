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
    this.state = {
      userId: '1234',
      status: ['Exploratory', 'Qualified', 'Outreach', 'Communication', 'Negotiation'],
      createModalIsOpen: false, 
      updateModalIsOpen: false,
      opportunities: [],
      opportunityToUpdate: {},
      isArchived: false,
      key: 2
    };
    this.openCreateOpportunityModal = this.openCreateOpportunityModal.bind(this);
    this.openUpdateOpportunityModal = this.openUpdateOpportunityModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.archiveOpportunity = this.archiveOpportunity.bind(this);
    this.updateOpportunity = this.updateOpportunity.bind(this);
    this.toggleArchived = this.toggleArchived.bind(this);
  }

  openCreateOpportunityModal() {
    this.setState({createModalIsOpen: true});
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
    axios.get('/opportunities', {params: {userId: this.state.userId, isArchived: this.state.isArchived}}).then((response) => {
      this.setState({
        opportunities: response.data
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
    axios.patch('/opportunities', {userFK: '1234', updateObj: updateObj}).then(()=>{
      this.getOpportunities();
    });
  }

  archiveOpportunity(id, oppIsArchived) {
    axios.patch('/opportunities', {userFK: '1234', updateObj: {_id: id, isArchived: !oppIsArchived}})
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
    //Force delayed rerender of opportunity card back to it's original column
    //If it is not switched to another column.
      interact('.draggable-opportunity').draggable({
        onend: () => {

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
          <OpportunityNavBar openCreateOpportunityModal={this.openCreateOpportunityModal} toggleArchived={this.toggleArchived} isArchived={this.state.isArchived}/>
          <Modal
            className='modal-form'
            overlayClassName='modal-overlay'
            isOpen={this.state.createModalIsOpen || this.state.updateModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="New Job.it Opportunity"
          >
            <button onClick={this.closeModal}>X</button> 
            {this.state.createModalIsOpen ? <CreateOpportunityForm  close = {() => {this.closeModal()}}/> : <div></div>}
            {this.state.updateModalIsOpen ? <UpdateOpportunityForm  opportunityToUpdate = {this.state.opportunityToUpdate} 
                                                                    close = {() => {this.closeModal()}}/> : <div></div>}
          </Modal>
          <div id='columns-wrapper' >
            {this.state.status.map((status) => {
                return <OpportunityColumn 
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