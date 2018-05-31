import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import TaskColumn from './taskColumn.jsx';
import TaskForm from './forms/taskForm.jsx';

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

class TaskView extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
        stages: ['Backlog', 'In Progress', 'Ready for Review', 'Completed'],
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
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.getTasks = this.getTasks.bind(this);
    this.addTask = this.addTask.bind(this);
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
        <div>
          <button onClick={() => this.props.switchViews()}>Back to Opportunities List</button><br/>
          <button onClick={this.openModal}>Add New Task</button>
        </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="New Job.it Opportunity"
            >
    
              <button onClick={this.closeModal}>X</button>
              <TaskForm currentOpportunity={this.props.currentOpportunity} />
            </Modal>
        { this.state.stages.map((stage) => 
          <TaskColumn currentOpportunity={this.props.currentOpportunity} stage={stage} tasks={this.state.tasks.filter((task) => {return task.status === stage})}/>)
        }
      </div>
    )
  }

}

export default TaskView;