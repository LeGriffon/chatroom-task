import React, { useState } from 'react';
import './Login.css'
import '../../components/Button/Button'
import Button from '../../components/Button/Button'
import TextInput from '../../components/TextInput/TextInput'

const Login = (props) => {
  // user login hanlder for username setup
  const loginHandler = (event) => {
      event.preventDefault()
      props.setUsername(event.target.username.value)
  }
  return (
    <div className="login">
        <form onSubmit={loginHandler}>
            <p id='label'>Please enter an username to enter the chatroom:</p>
            <TextInput type="text" id="username"/><br/>
            <Button type="submit" value="Connect" id='button'/>
        </form>
        <p id='systemMessage'>{props.systemMessage}</p>
    </div>
  )
}


export default Login;
