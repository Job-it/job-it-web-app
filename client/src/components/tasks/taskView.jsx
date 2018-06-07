import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import interact from 'interactjs';
import TaskColumn from './taskColumn.jsx';
import TaskForm from '../forms/taskForm.jsx';
import TaskNavBar from '../navbars/taskNavBar.jsx';
import UpdateTaskForm from '../forms/updateTaskForm.jsx';

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
        selectedStatus: '',
        isArchived: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleArchived = this.toggleArchived.bind(this);
    this.archiveTask = this.archiveTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.getTasksAndSetState = this.getTasksAndSetState.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
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
  openModal(taskObj, status) {
    if (taskObj === undefined) {
      this.setState({
        modalIsOpen: true,
        postTaskForm: true,
        selectedStatus: status,
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
        isArchived: this.state.isArchived
      }
    })
    .then((resp) => {
      this.setState({
        tasks: resp.data,
      });
    })
    .catch((err) => {
      console.error('There was an error getting tasks and setting state: ', err);
    });
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
      isArchived: updateObj.isArchived
    })
    .then(() => {
      this.getTasksAndSetState();
    })
    .catch((err) => {
      console.error('There was an error in updating the task: ', err);
    });
  }

  archiveTask(id, taskIsArchived) {
    var updateObj = this.state.tasks.filter((task) => task._id === id)[0];
    axios.patch('/tasks', {
      taskId: id,
      taskContent: updateObj.content,
      due: updateObj.dueDate,
      currentStatus: updateObj.status,
      isArchived: taskIsArchived ? false : true
    })
    .then(() => {
      this.getTasksAndSetState();
    })
    .catch((err) => {
      console.error('There was an error archiving the task: ', err);
    });
  }

  toggleArchived() {
    this.setState({
      isArchived : this.state.isArchived ? false : true
    }, () => this.getTasksAndSetState());
  }

  deleteTask(id) {
    axios.delete('/tasks', {
      params: {
        _id : id
      }
    })
    .then(() => {
      this.getTasksAndSetState();
    })
    .catch((err) => {
      console.error('There was an error deleting the task: ', err);
    });
  }

  render() {
    return (
      <div id='view-wrapper'>
        <div>
          <TaskNavBar handleLogout = {this.props.handleLogout} switchViews={this.props.switchViews} toggleArchived={this.toggleArchived} isArchived={this.state.isArchived} openModal={this.openModal} closeModal={this.closeModal} />
        </div>
        <div className='page-header'>
          <h1>{this.props.currentOpportunityName}<br /><small>{this.props.currentOrgName}</small></h1>
        </div>
            <Modal
              className='modal-form'
              overlayClassName='modal-overlay'
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="New Job.it Opportunity"
            >
    
              <button className='close-modal' onClick={this.closeModal}>X</button>
              {this.state.postTaskForm ? <TaskForm columnName={this.state.selectedStatus} currentOpportunity={this.props.currentOpportunity} closeModal={this.closeModal} /> : <div></div>}
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
            archiveTask={this.archiveTask}
            deleteTask={this.deleteTask}
          />)
        }
        </div>
      </div>
    )
  }
 
 }
 
 export default TaskView;