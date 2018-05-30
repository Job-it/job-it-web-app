import React from 'react'
import ReactDOM from 'react-dom'

import Column from './column.jsx'

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
                Status: 'Exploratory',
                Type: 'Job Opportunity'
            }]
        }
    }

    getOpportunities() {
        //use Axios to get opportunities
    }

    render() {
        return (
            this.state.stages.map((stage) => {
                return <Column stage = {stage}/>
            })
        )
    }

}

export default opportunityView