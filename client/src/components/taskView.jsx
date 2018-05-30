import React from 'react'
import ReactDOM from 'react-dom'

import Column from './column.jsx'

class taskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stages: ['Backlog', 'In Progress', 'Ready for Review', 'Submitted'],
            tasks: [{
                Id: 1,
                Opportunity_FK: 1000,
                Content: 'Send in Resume to recruiter',
                Done: false,
                Due_Date: 'Jan.1st, 2020',
                Status: 'Backlog'
            }]
        }
    }

    getTasks() {
        //use axios to get tasks
    }

    render() {
        return (
            this.state.stages.map((stage) => {
                return <Column stage = {stage}/>
            })
        )
    }

}

export default taskView