import React from 'react'
import ReactDOM from 'react-dom'

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
                return <div>This is the task view</div>
            })
        )
    }

}

export default taskView