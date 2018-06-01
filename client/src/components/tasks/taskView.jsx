import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
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
    height: '50%',

  }
};

class TaskView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        stages: ['Backlog', 'In Progress', 'Ready for Review', 'Completed'],
        modalIsOpen: false,
        postTaskForm: false,
        patchTaskForm: false,
        tasks: [],
        currentTask: '',
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.addTask = this.addTask.bind(this);
  }
  componentDidMount() {
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
    
  }

  addTask() {
    this.setState({
      modalIsOpen: this.state.modalIsOpen ? false : true
    });
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.props.switchViews()}>Back to Opportunities List</button><br/>
          <button onClick={() => this.openModal()}>Add New Task</button>
        </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="New Job.it Opportunity"
            >
    
              <button onClick={this.closeModal}>X</button>
              {this.state.postTaskForm ? <TaskForm currentOpportunity={this.props.currentOpportunity} /> : <div></div>}
              {this.state.patchTaskForm ? <UpdateTaskForm currentOpportunity={this.props.currentOpportunity} currentTask={this.state.currentTask} /> : <div></div>}
            </Modal>
        { this.state.stages.map((stage) => 
          <TaskColumn 
            currentOpportunity={this.props.currentOpportunity} 
            stage={stage} 
            tasks={this.state.tasks.filter((task) => {return task.status === stage})}
            openModal={this.openModal}
            afterOpenModal={this.afterOpenModal}
            closeModal={this.closeModal}
          />)
        }
      </div>
    )
  }

}

export default TaskView;