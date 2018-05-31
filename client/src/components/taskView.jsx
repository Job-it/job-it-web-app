import React from 'react';
import TaskColumn from './taskColumn.jsx';

class TaskView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        stages: ['Backlog', 'In Progress', 'Ready for Review', 'Completed'],
        opportunityFK: 0,
        taskForm: false,
        tasks: [
          {
            opportunityFK: 1000,
            content: 'Send in Resume to recruiter',
            completion: false,
            dueDate: 'Jan.1st, 2020',
            status: 'Backlog'
          },
          {
          opportunityFK: 1100,
            content: 'Email thank you note to recruiter',
            completion: false,
            dueDate: 'Jan.1st, 2019',
            status: 'Backlog'
          },
          {
            opportunityFK: 110,
            content: 'Reach back out to Recruiter',
            completion: false,
            dueDate: 'Jan.1st, 2020',
            status: 'Backlog'
          },
          {
            opportunityFK: 130,
            content: 'Send in Resume to recruiter',
            completion: false,
            dueDate: 'Jan.1st, 2020',
            status: 'In Progress'
          },
          {
            opportunityFK: 500,
            content: 'Send in Resume to recruiter',
            completion: true,
            dueDate: 'Jan.1st, 2020',
            status: 'Completed'
          }
        ]
    };
    this.getTasks = this.getTasks.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask() {
    this.setState({
      taskForm: this.state.taskForm ? false : true
    });
  }

  getTasks(stage) {
      //use axios to get tasks
  }

  render() {
    return (
      <div>
        <button onClick={() => this.addTask()}>Add Task</button>
        { this.state.taskForm ? <TaskForm/> : <div></div> }
        { this.state.stages.map((stage) => 
          <TaskColumn stage={stage} tasks={ this.state.tasks.filter((task) => {return task.status === stage}) }/>)
        }
      </div>
    )
  }

}

export default TaskView;