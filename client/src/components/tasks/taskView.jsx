import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import interact from 'interactjs';
import TaskColumn from './taskColumn.jsx';
import TaskForm from '../forms/taskForm.jsx';
import UpdateTaskForm from '../forms/updateTaskForm.jsx';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',

  }
};

class TaskView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        stages: ['Backlog', 'In Progress', 'Ready For Review', 'Completed'],
        modalIsOpen: false,
        postTaskForm: false,
        patchTaskForm: false,
        tasks: [],
        currentTask: '',
        isArchived: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.addTask = this.addTask.bind(this);
    this.getTasksAndSetState = this.getTasksAndSetState.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }
  componentDidMount() {
    this.getTasksAndSetState();

    //Force rerender of task card back to it's original column
    //If it is not switched to another column.
    interact('.draggable-task').draggable({
      onend: () => {
        setTimeout(() => {
          var currentTasks = this.state.tasks;
          this.setState({
            tasks: [],
          });
          this.setState({
            tasks: currentTasks,
          });
        }, 0);
      }
    });
  }
  openModal(taskObj) {
    if (taskObj === undefined) {
      this.setState({
        modalIsOpen: true,
        postTaskForm: true,
      });
    } else {
      this.setState({
        modalIsOpen: true,
        patchTaskForm: true,
        currentTask: taskObj,
      });
    }
  }
  afterOpenModal() {
    //
  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
      postTaskForm: false,
      patchTaskForm: false,
      currentTask: '',
    });
    this.getTasksAndSetState();
  }

  getTasksAndSetState() {
    axios.get('/tasks', {
      params: {
        opportunity: this.props.currentOpportunity,
      }
    })
    .then((resp) => {
      this.setState({
        tasks: resp.data,
      });
    })
  }

  addTask() {
    this.setState({
      modalIsOpen: this.state.modalIsOpen ? false : true
    });
  }

  updateTask(id, status) {
    var updateObj = this.state.tasks.filter((task) => task._id === id)[0];
    //capitalize the first letter in the status column
    updateObj.status = status.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
    //patch db and get update
    axios.patch('/tasks', {
      taskId: updateObj._id,
      taskContent: updateObj.content,
      due: updateObj.dueDate,
      currentStatus: updateObj.status,
    })
    .then(() => {
      this.getTasksAndSetState();
    })
  }

  render() {
    return (
      <div id='view-wrapper'>
        <div>
          <button className='view-button' onClick={() => this.props.switchViews()}>⬅ All Opportunities</button>
          <button className='create-new view-button' onClick={() => this.openModal()}>+ Task</button>
        </div>
        <div className='task-opportunity-title-wrapper'>
        <h1 className='task-opportunity-title'>{this.props.currentOpportunityName}</h1>
        <h2 className='task-org-name'>{this.props.currentOrgName}</h2>
        </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="New Job.it Opportunity"
            >
    
              <button onClick={this.closeModal}>X</button>
              {this.state.postTaskForm ? <TaskForm currentOpportunity={this.props.currentOpportunity} closeModal={this.closeModal} /> : <div></div>}
              {this.state.patchTaskForm ? <UpdateTaskForm currentTask={this.state.currentTask} closeModal={this.closeModal} /> : <div></div>}
            </Modal>
            <div id='columns-wrapper'>
        { this.state.stages.map((stage) => 
          <TaskColumn 
            updateTask={this.updateTask}
            currentOpportunity={this.props.currentOpportunity} 
            stage={stage} 
            tasks={this.state.tasks.filter((task) => {return task.status === stage})}
            openModal={this.openModal}
            afterOpenModal={this.afterOpenModal}
            closeModal={this.closeModal}
          />)
        }
        </div>
      </div>
    )
  }

}

export default TaskView;