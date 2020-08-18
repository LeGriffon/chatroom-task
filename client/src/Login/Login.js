import React, { Component } from 'react';

class Login extends Component {
    loginHandler = (event) => {
        event.preventDefault()
        this.props.setUsername(event.target.username.value)
    }
  render() {
    return (
      <div id="login">
          <form onSubmit={this.loginHandler}>
              <label>Please enter an username to enter the chatroom:</label><br/>
              <input type="text" id="username"/><br/>
              <input type="submit" value="Connect"/>
          </form>
      </div>
    );
  }
}

export default Login;
