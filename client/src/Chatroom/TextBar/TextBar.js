import React, { Component } from 'react';

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
      <div id="textBar">
          <form onSubmit={this.messageButtonSendHandler}>
            <textarea onKeyDown={this.messageEnterKeyHandler} id="textContent" ></textarea><br/>
            <input type="submit" value="Send"/>
            <input onClick={this.disconnectHandler} type="button" value="Disconnect"/>
          </form>
          
      </div>
    );
  }
}

export default TextBar;
