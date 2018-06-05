import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('what is E value?: ', e);
    console.log('what is the username?: ', this.state.username);
    console.log('what is the password??: ', this.state.password);
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2 id='login-form-title'>Login</h2>
          <input
            className='login-input'
            type="text"
            value={this.state.username}
            placeholder="username"
            onChange={(e) => {
              this.setState({
                username: e.target.value
              })
            }}
          />
          <input
            className='login-input'
            type="text"
            value={this.state.password}
            placeholder="password"
            onChange={(e) => {
              this.setState({
                password: e.target.value
              })
            }}
          />
          <input type='submit' value="Login"/>
          <button>Sign Up</button>
        </form>
      </div>
    );
  }

};

export default LoginForm;