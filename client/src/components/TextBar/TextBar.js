import React, { Component } from 'react';
import './TextBar.css'
import Button from '../../components/Button/Button'
import TextInput from '../../components/TextInput/TextInput'

class TextBar extends Component {
    // enter key handler for textbox input
    messageEnterKeyHandler = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            this.props.getMessage(event.target.value)
            event.target.value = ""
        }
    }

    // send button handler for form input
    messageButtonSendHandler = (event) => {
        event.preventDefault()
        this.props.getMessage(event.target.textContent.value)
        event.target.textContent.value = ""
    }

    // disconnect handler for user initiated exit code 0
    disconnectHandler = (event) => {
        this.props.disconnect(0)
    }

  render() {
    return (
      <div className="textBar">
          <form onSubmit={this.messageButtonSendHandler}>
            <div id='displayrow'>
              <TextInput id="textContent" onKeyDown={this.messageEnterKeyHandler} type="text"/>
              <div id='buttonrow'>
                <Button id='sendbutton' type="submit" value="Send" />
                <Button id='disconnectbutton' onClick={this.disconnectHandler} type="button" value="Disconnect" />
              </div>
            </div>
          </form>
          
      </div>
    );
  }
}

export default TextBar;
