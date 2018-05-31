import React from 'react';
import Modal from 'react-modal';
import OpportunityColumn from './opportunityColumn.jsx';
import OpportunityForm from './forms/opportunityForm.jsx';

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
      stages: ['Exploratory', 'Qualified', 'Outreach', 'Communication', 'Negotiation'],
      modalIsOpen: false, 
      opportunities: [
        {
          id: 1,
          User_FK: 1000,
          Date_Opened: 'Jan. 1, 2018',
          Date_Closed: false,
          Opportunity_Name: 'Job Opportunity',
          Organization_Name: 'Google',
          Rank: 5, 
          Stage: 'Exploratory',
          Type: 'Job Opportunity'
        },
        {
          id: 2,
          User_FK: 1000,
          Date_Opened: 'Jan. 1, 2018',
          Date_Closed: false,
          Opportunity_Name: 'Networking Event',
          Organization_Name: 'Google',
          Rank: 5, 
          Stage: 'Qualified',
          Type: 'Job Opportunity'
        },
        {
          id: 3,
          User_FK: 1000,
          Date_Opened: 'Jan. 1, 2018',
          Date_Closed: false,
          Opportunity_Name: 'Job Opening',
          Organization_Name: 'Google',
          Rank: 5, 
          Stage: 'Negotiation',
          Type: 'Job Opportunity'
        },
        {
          id: 4,
          User_FK: 1000,
          Date_Opened: 'Jan. 1, 2018',
          Date_Closed: false,
          Opportunity_Name: 'Job Opening',
          Organization_Name: 'Google',
          Rank: 5, 
          Stage: 'Outreach',
          Type: 'Job Opportunity'
        },
        {
          id: 5,
          User_FK: 1000,
          Date_Opened: 'Jan. 1, 2018',
          Date_Closed: false,
          Opportunity_Name: 'Job Opening',
          Organization_Name: 'Google',
          Rank: 5, 
          Stage: 'Communication',
          Type: 'Job Opportunity'
        }
      ]
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

    openModal() {
      this.setState({modalIsOpen: true});
    }
    afterOpenModal() {
    //
    }
    closeModal() {
      this.setState({modalIsOpen: false});
    }
    getOpportunities() {
        //use Axios to get opportunities
    }

    render() {
        return (
          <div>
            <button onClick={this.openModal}>Add New Opportunity</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="New Job.it Opportunity"
            >
    
              <button onClick={this.closeModal}>X</button>
              <OpportunityForm />
            </Modal>
            <div>
            {this.state.stages.map((stage) => {
                return <OpportunityColumn selectOpportunity={this.props.selectOpportunity} stage={stage} itemsToRender={this.state.opportunities.filter((opportunity) => {
                    return opportunity.Stage === stage;
                })}/>
            })}
            </div>
          </div>
        )
    }

}

export default OpportunityView;