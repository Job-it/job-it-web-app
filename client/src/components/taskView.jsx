import React from 'react';
import ReactDOM from 'react-dom';

import TaskList from './taskList.jsx';

class TaskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stages: ['Backlog', 'In Progress', 'Ready for Review', 'Completed'],
            tasks: [{
                Id: 1,
                Opportunity_FK: 1000,
                Content: 'Send in Resume to recruiter',
                Done: false,
                Due_Date: 'Jan.1st, 2020',
                Status: 'Backlog'
            }]
        };
        this.getTasks = this.getTasks.bind(this);
    }

    getTasks(stage) {
        //use axios to get tasks
    }

    render() {
        return (
            this.state.stages.map((stage) => {
                return <TaskList stage={stage} getTasks={this.getTasks}/>
            })
        )
    }

}

export default TaskView;