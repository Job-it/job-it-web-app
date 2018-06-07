import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class updateOpportunityForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      _id: '',
      dateOpened: '',
      dateClosed: moment(),
      oppName: '',
      orgName: '',
      rank: 4, 
      status: '', // enable dropdown
      type: '' // enable dropdown
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      _id: this.props.opportunityToUpdate._id,
      dateOpened: this.props.opportunityToUpdate.dateOpened,
      dateClosed: moment(this.props.opportunityToUpdate.dateClosed),
      oppName: this.props.opportunityToUpdate.oppName,
      orgName: this.props.opportunityToUpdate.orgName,
      rank: this.props.opportunityToUpdate.rank, 
      status: this.props.opportunityToUpdate.status,
      type: this.props.opportunityToUpdate.type
    })
  }

  handleDateChange(date) {
    this.setState({
      dateClosed: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.patch('/opportunities', {userFK: '1234', updateObj: this.state})
      .then((res) => {
      console.log(res);
    });
    this.props.close();
  }

  render() {
    //create form that
    return (
      <div id='opportunity-form-wrapper'>
        <form onSubmit={this.handleSubmit}>
        <h2 id='opportunity-form-title'>Update Opportunity:</h2>
          <input
            className='login-input'
            type="text"
            value={this.state.oppName}
            placeholder={this.state.oppName}
            onChange={(e) => {
              this.setState({oppName: e.target.value})
            }}
          />
          <input
            className='login-input'
            type="text"
            value={this.state.orgName}
            placeholder={this.state.orgName}
            onChange={(e) => {
              this.setState({orgName: e.target.value})
            }}
          />
          <h4>Due Date:</h4>
          <DatePicker
            selected={this.state.dateClosed}
            onChange={this.handleDateChange}
            showTimeSelect
            dateFormat="LLL"
            withPortal
          />
          <select 
            name="status" 
            value= {this.props.opportunityToUpdate.status}
            onChange={(e) => {
              this.setState({status: e.target.value})
            }}>
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

export default updateOpportunityForm;