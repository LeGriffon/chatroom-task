import React, { Component } from 'react';

class TextBar extends Component {

    messageEnterKeyHandler = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            this.props.getMessage(event.target.value)
            event.target.value = ""
        }
    }

    messageButtonSendHandler = (event) => {
        event.preventDefault()
        this.props.getMessage(event.target.textContent.value)
        event.target.textContent.value = ""
    }

    disconnectHandler = (event) => {
        this.props.disconnect()
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
