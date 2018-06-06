import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className = "login-header login">
          <img className = "login-logo" src = "img/dogo.png"></img>
          <h1 className = "login-welcome">
            Welcome to Jobit
            <span className = "login-welcome-underscore">&#160;_</span>
          </h1>
        </div>
        <div className = "login-part2">
          <div className = "login-box">
            <div className = "login-cta">
              Click here to login with your Github account 
            </div>
            <img className = "login-logo-github" src = "img/25231.svg"></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;