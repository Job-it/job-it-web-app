import React from 'react'
import ReactDOM from 'react-dom'

import OpportunityColumn from './opportunityColumn.jsx'

class opportunityView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stages: ['Exploratory', 'Qualified', 'Outreach', 'Communication', 'Negotiation'],
            opportunities: [{
                id: 1,
                User_FK: 1000,
                Date_Opened: 'Jan. 1, 2018',
                Date_Closed: false,
                Opportunity_Name: 'Job Opportunity',
                Organization_Name: 'Google',
                Rank: 5, 
                Stage: 'Exploratory',
                Type: 'Job Opportunity'
            },{
              id: 1,
              User_FK: 1000,
              Date_Opened: 'Jan. 1, 2018',
              Date_Closed: false,
              Opportunity_Name: 'Networking Event',
              Organization_Name: 'Google',
              Rank: 5, 
              Stage: 'Qualified',
              Type: 'Job Opportunity'
          },{
            id: 1,
            User_FK: 1000,
            Date_Opened: 'Jan. 1, 2018',
            Date_Closed: false,
            Opportunity_Name: 'Job Opening',
            Organization_Name: 'Google',
            Rank: 5, 
            Stage: 'Negotiation',
            Type: 'Job Opportunity'
          }, {
            id: 1,
            User_FK: 1000,
            Date_Opened: 'Jan. 1, 2018',
            Date_Closed: false,
            Opportunity_Name: 'Job Opening',
            Organization_Name: 'Google',
            Rank: 5, 
            Stage: 'Outreach',
            Type: 'Job Opportunity'
          }, {
            id: 1,
            User_FK: 1000,
            Date_Opened: 'Jan. 1, 2018',
            Date_Closed: false,
            Opportunity_Name: 'Job Opening',
            Organization_Name: 'Google',
            Rank: 5, 
            Stage: 'Communication',
            Type: 'Job Opportunity'
          }]
        }
    }

    getOpportunities() {
        //use Axios to get opportunities
    }

    render() {
        return (
          <div>
            {this.state.stages.map((stage) => {
                return <OpportunityColumn stage = {stage} itemsToRender = {this.state.opportunities.filter((opportunity) => {
                    return opportunity.Stage === stage;
                })}/>
            })}
          </div>
        )
    }

}

export default opportunityView