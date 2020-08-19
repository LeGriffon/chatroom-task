import React, { Component } from 'react';

class MessageWindow extends Component {
    // function that displays the message from chatroom using props
    displayMessages = () => this.props.messages.map(message => 
        <div>
            <strong>{message.username}</strong> <em>{message.message}</em>
        </div>
    )
    

  render() {
    return (
      <div className="messageWindow">
          {this.displayMessages()}
      </div>
    );
  }
}

export default MessageWindow;
