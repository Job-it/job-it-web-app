import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class opportunityForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      dateOpened: '',
      dateClosed: false,
      opportunityName: '',
      organizationName: '',
      rank: 5, 
      status: '', // enable dropdown
      type: '', // enable dropdown
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      dateOpened: Date.now()
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
        <h2 id='opportunity-form-title'>Add A New Opportunity:</h2>
          <input
            className='login-input'
            type="text"
            value={this.state.opportunityName}
            placeholder="Opportunity Name"
            onChange={(e) => {
              this.setState({opportunityName: e.target.value})
            }}
          />
          <input
            className='login-input'
            type="text"
            value={this.state.organizationName}
            placeholder="Organization Name"
            onChange={(e) => {
              this.setState({organizationName: e.target.value})
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

export default opportunityForm;