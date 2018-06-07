import React from 'react';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "login-wrapper">
        <div className = "login-header login">
          <img className = "login-logo" src = "img/dogo.png"></img>
          <h1 className = "login-welcome">
            Welcome to Jobit
            <span className = "login-welcome-underscore">&#160;_</span>
          </h1>
        </div>
        <div className = "login-part2">
        <a href = "/auth/github">
          <div className = "login-box">
              <div className = "login-cta">
                Click here to login with your Github account 
              </div>
              <img className = "login-logo-github" src = "img/25231.svg"></img>
          </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;