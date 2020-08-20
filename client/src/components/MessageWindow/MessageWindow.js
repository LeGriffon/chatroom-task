import React, { Component } from 'react';
import './MessageWindow.css'

class MessageWindow extends Component {
  // function that displays the message from chatroom using props
  displayMessages = () => this.props.messages.map(message =>
    <li key={message.message}>
      <div className="message">
        <div className="username">
          <strong>{message.username}</strong>
        </div>
        
        <div className="message-messageContainer">
          <p className="message-content">{message.message}</p>
        </div>
      </div>
    </li>
  )

  render() {
    return (
      <div className='messageWindow' id='messageDiv'>
        <ul>
          {this.displayMessages()}
        </ul>
      </div>
    );
  }
}

export default MessageWindow;
