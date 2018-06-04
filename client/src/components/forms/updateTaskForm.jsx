import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class UpdateTaskForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      taskId: this.props.currentTask._id,
      taskContent: '',
      isArchived: false,
      dueDate: moment(),
      status: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    //populate the task form with the info from the current task
    this.setState({
      taskContent: this.props.currentTask.content,
      isArchived: this.props.currentTask.completion,
      dueDate: moment(this.props.currentTask.dueDate),
      status: this.props.currentTask.status,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios.patch('/tasks', {
      taskId: this.state.taskId,
      taskContent: this.state.taskContent,
      isArchived: this.state.isArchived,
      due: this.state.dueDate,
      currentStatus: this.state.status,
    })
    .then(() => {
      this.props.closeModal();
    })
  }


  handleDateChange(date) {
    this.setState({
      dueDate: date
    });
  }

  render() {
    //create form that
    return (
      <div id='task-form-wrapper'>
        <form onSubmit={this.handleSubmit}>
        <h2 id='task-form-title'>Update Your Task:</h2>
          <input
            className='new-task-input'
            type="text"
            value={this.state.taskContent}
            placeholder="Task Name"
            onChange={(e) => {
              this.setState({taskContent: e.target.value})
            }}
          />
          <h4>Due Date:</h4>
          <DatePicker
            selected={this.state.dueDate}
            onChange={this.handleDateChange}
            showTimeSelect
            dateFormat="LLL"
          />
          <select 
            name="status" 
            value= {this.props.currentTask.status}
            onChange={(e) => {
              this.setState({status: e.target.value})
              }}
          >
            <option value="Backlog">Backlog</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready For Review">Ready For Review</option>
            <option value="Completed">Completed</option>
          </select>
          <input type ='submit'></input>
        </form>
        </div>
    );
  }

};

export default UpdateTaskForm;