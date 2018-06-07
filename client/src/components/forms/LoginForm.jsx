import React from 'react';

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
    this.props.handleLogin();
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