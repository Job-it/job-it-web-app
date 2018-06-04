import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    //opportunityFK is passed down as props from the taskView
    //this.props.currentOpportunity

    this.state = {
      opportunityFK: this.props.currentOpportunity,
      content: '',
      completion: false,
      dueDate: moment(),
      status: '',
      isArchived: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      //Hard code first item in status list
      status: 'Backlog',
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post('/tasks', this.state)
      .then((res) => {
      this.props.closeModal();
    });
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
        <h2 id='task-form-title'>Add A New Task:</h2>
          <input
            className='new-task-input'
            type="text"
            value={this.state.content}
            placeholder="Task Name"
            onChange={(e) => {
              this.setState({content: e.target.value})
            }}
          />
          <h4>Due Date:</h4>
          <DatePicker
            selected={this.state.dueDate}
            onChange={this.handleDateChange}
            showTimeSelect
            dateFormat="LLL"
          />
          <select name="status" onChange={(e) => {
              this.setState({status: e.target.value})
            }}>
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

export default TaskForm;