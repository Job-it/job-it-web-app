import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import OpportunityColumn from './opportunityColumn.jsx';
import CreateOpportunityForm from '../forms/opportunityForm.jsx';
import UpdateOpportunityForm from '../forms/updateOpportunityForm.jsx';
import interact from 'interactjs';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '80%',
    height: '50%',

  }
};

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
      isArchived: false
    }
    this.openCreateOpportunityModal = this.openCreateOpportunityModal.bind(this);
    this.openUpdateOpportunityModal = this.openUpdateOpportunityModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.archiveOpportunity = this.archiveOpportunity.bind(this);

  interact('.dropzone').dropzone({
    
    ondrop: function (event) {
      var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;
          //update DB here!!!
          var id = draggableElement.dataset.id;
          var targetColumn = dropzoneElement.classList[dropzoneElement.classList.length - 3];
          console.log(id);
          console.log(targetColumn);
    }
  });


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
      axios.get('/opportunities', {params: {userId: this.state.userId, isArchived: (this.state.isArchived ? true : false)}}).then((response) => {
        console.log(response.data);
        this.setState({
          opportunities: response.data
        })
      });
    }

    deleteOpportunity(oppId) {
      axios.delete('/opportunities', {params: {_id: oppId}});
    }

    updateOpportunity() {
      axios.patch('/opportunities', {userFK: this.state.userFK, oppName: 'Coffee', updateObj: {orgName: 'Facebook'}});
    }

    archiveOpportunity(oppId) {
      // console.log('inside archiveOpp func.', oppId);
      axios.patch('/opportunities', {userFK: '1234', updateObj: {_id: oppId, isArchived: true}});
      // .then(){userFK: '1234', updateObj: this.state}
    }

    componentDidMount() {
      this.getOpportunities();
    }

    render() {
        return (
          <div id='view-wrapper'>
            <button onClick={() => this.props.switchViews()}>Back to Task List</button><br/>
            <button onClick={this.openCreateOpportunityModal}>Add New Opportunity</button>

            <Modal
              isOpen={this.state.createModalIsOpen || this.state.updateModalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="New Job.it Opportunity"
            >
              <button onClick={this.closeModal}>X</button> 
              {this.state.createModalIsOpen ? <CreateOpportunityForm /> : <div></div>}
              {this.state.updateModalIsOpen ? <UpdateOpportunityForm  opportunityToUpdate = {this.state.opportunityToUpdate} 
                                                                      close = {() => {this.closeModal()}}/> : <div></div>}
            </Modal>
            <button onClick={() => {this.setState({isArchived: !this.state.isArchived})}}>{ this.state.isArchived ? 'Hide Archived' : 'Show Archived'}</button>

            <div id='columns-wrapper'>
              {this.state.status.map((status) => {
                  return <OpportunityColumn deleteOpp = {(id) => {this.deleteOpportunity(id)}} 
                                            selectOpportunity={this.props.selectOpportunity} 
                                            status={status}
                                            archiveOpportunity={this.archiveOpportunity} 
                                            update = {(opp) => {this.openUpdateOpportunityModal(opp)}}
                      itemsToRender={this.state.opportunities.filter((opportunity) => {
                      return opportunity.status === status;
                  })}/>
              })}
            </div>
          </div>
        )
    }

}

export default OpportunityView;