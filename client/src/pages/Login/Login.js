import React, { Component } from 'react';
import './Login.css'
import '../../components/Button/Button'
import Button from '../../components/Button/Button'
import TextInput from '../../components/TextInput/TextInput'

class Login extends Component {
    // user login hanlder for username setup
    loginHandler = (event) => {
        event.preventDefault()
        this.props.setUsername(event.target.username.value)
    }
  render() {
    return (
      <div className="login">
          <form onSubmit={this.loginHandler}>
              <p id='label'>Please enter an username to enter the chatroom:</p>
              <TextInput type="text" id="username"/><br/>
              <Button type="submit" value="Connect" id='button'/>
          </form>
          <p id='systemMessage'>{this.props.systemMessage}</p>
      </div>
    );
  }
}

export default Login;
