import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class updateOpportunityForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      dateOpened: this.props.dateOpened,
      dateClosed: this.props.dateClosed,
      oppName: this.props.oppName,
      orgName: this.props.orgName,
      rank: this.props.rank, 
      status: this.props.status, // enable dropdown
      type: this.props.type, // enable dropdown
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      dateOpened: Date.now(),
      dateClosed: Date.now() + 20,
      //Hard code first item in status list
      status: 'Exploratory',
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/opportunities', this.state)
      .then((res) => {
      console.log(res);
    });
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
          <select name="status" onChange={(e) => {
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