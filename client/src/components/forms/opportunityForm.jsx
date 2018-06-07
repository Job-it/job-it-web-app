import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class createOpportunityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOpened: '',
      dateClosed: false,
      oppName: '',
      orgName: '',
      rank: 4, 
      status: this.props.columnName, // enable dropdown
      type: '', // enable dropdown
      isArchived: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      dateOpened: Date.now(),
      dateClosed: moment(),
    });
  }

  handleDateChange(date) {
    this.setState({
      dateClosed: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/opportunities', this.state)
      .then((res) => {
      // console.log(res);
    });
    this.props.close();
  }

  render() {
    //create form that
    return (
      <div id='opportunity-form-wrapper'>
        <form onSubmit={this.handleSubmit}>
        <h2 id='opportunity-form-title'>Create a New Opportunity:</h2>
          <input
            className='login-input'
            type="text"
            value={this.state.oppName}
            placeholder="Opportunity Name"
            onChange={(e) => {
              this.setState({oppName: e.target.value})
            }}
          />
          <input
            className='login-input'
            type="text"
            value={this.state.orgName}
            placeholder="Organization Name"
            onChange={(e) => {
              this.setState({orgName: e.target.value})
            }}
          />
          <h4>Due Date:</h4>
          <DatePicker
            selected={this.state.dateClosed}
            onChange={this.handleDateChange}
            showTimeSelect
            withPortal
            dateFormat="LLL"
          />
          <select 
            name="status" 
            value={this.props.columnName || 'Exploratory'}
            onChange={(e) => {
                this.setState({status: e.target.value})
              }}
            >
            <option value="Exploratory">Exploratory</option>
            <option value="Qualified">Qualified</option>
            <option value="Outreach">Outreach</option>
            <option value="Communication">Communication</option>
            <option value="Negotiation">Negotiation</option>
          </select>
          <input type ='submit'></input>
        </form>
        </div>
    );
  }

};

export default createOpportunityForm;