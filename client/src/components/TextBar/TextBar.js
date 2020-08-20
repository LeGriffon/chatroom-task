import React, { Component } from 'react';
import './TextBar.css'
import Button from '../../components/Button/Button'
import TextInput from '../../components/TextInput/TextInput'

const textbar = (props) => {
    // enter key handler for textbox input
    const messageEnterKeyHandler = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            props.getMessage(event.target.value)
            event.target.value = ""
        }
    }

    // send button handler for form input
    const messageButtonSendHandler = (event) => {
        event.preventDefault()
        props.getMessage(event.target.textContent.value)
        event.target.textContent.value = ""
    }

    // disconnect handler for user initiated exit code 0
    const disconnectHandler = (event) => {
        props.disconnect(0)
    }
  return (
    <div className="textBar">
        <form onSubmit={messageButtonSendHandler}>
          <div id='displayrow'>
            <TextInput id="textContent" onKeyDown={messageEnterKeyHandler} type="text"/>
            <div id='buttonrow'>
              <Button id='sendbutton' type="submit" value="Send" />
              <Button id='disconnectbutton' onClick={disconnectHandler} type="button" value="Disconnect" />
            </div>
          </div>
        </form>
        
    </div>
  )
};

export default textbar;
